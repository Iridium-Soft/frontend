import React, { Component } from 'react';

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {
    parentCallback: any,
    refScores: Array<any>,
}

type State = {
    scores: Array<{evaluacion_id: number, puntuacion: number}>,
    message: string,
}

export default class ScoresTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scores: [],
            message: "",
        }

        this.onTrigger = this.onTrigger.bind(this);
        this.changeScore = this.changeScore.bind(this);
        this.checkScores = this.checkScores.bind(this);
    }

    onTrigger() {
        this.props.parentCallback({
            scores: this.state.scores,
            message: this.state.message,
        });
    }

    checkScores() {
        let ans: boolean = false;

        for(let i = 0; i < this.props.refScores?.length; i++) {
            if(this.state.scores[i].puntuacion > this.props.refScores[i]?.puntajeReferencial || this.state.scores[i] === null) {
                ans = true;
                this.setState({
                    message: "El siguiente campo debe ser correctamente llenado: Alguno de los puntajes es incorrecto"
                })
                return;
            }
        }
        this.setState({
            message: ""
        });
    }

    changeScore(event: ChangeElement) {
        let copy: Array<any> = this.state.scores;
        let valueName: string = event.target.id;
        let index: number = parseInt(valueName.charAt(valueName.length - 1)) - 1;
        copy[index].punt = parseInt(event.target.value);
        this.setState({
           scores: copy,
        });
        this.checkScores();
        this.onTrigger();
    }

    render() {
        const { refScores } = this.props;
        let fields: number = 1;
        return(
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td className="col-8 fs-5 p-2"><strong>Descripcion</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Referencial</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Obtenido</strong></td>
                </tr>
                {refScores && refScores.map((evaluacion: any) => (
                    <tr>
                        <td>
                            {evaluacion.descripcion}
                        </td>
                        <td align="center">
                            {evaluacion.puntajeReferencial} puntos
                        </td>
                        <td>
                            <input
                                type="number"
                                className="input col-12"
                                id={"value" + fields}
                                onChange={this.changeScore}
                                min="1"
                                max={evaluacion.puntajeReferencial}
                                required
                            />
                        </td>
                    </tr>
                    ) && fields++)}
                </tbody>
            </table>
        );
    }
}
