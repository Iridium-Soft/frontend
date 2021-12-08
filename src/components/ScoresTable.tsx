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
            scores: [
                {
                    evaluacion_id: 1,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 2,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 3,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 4,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 5,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 6,
                    puntuacion: NaN,
                },
                {
                    evaluacion_id: 7,
                    puntuacion: NaN,
                }
            ],
            message: "El siguiente campo debe ser correctamente llenado: Alguno de los puntajes es incorrecto",
        }

        this.onTrigger = this.onTrigger.bind(this);
        this.changeScore = this.changeScore.bind(this);
    }

    onTrigger() {
        this.props.parentCallback({
            scores: this.state.scores,
        });
    }

    // checkScores() {
    //     for(let i = 0; i < this.props.refScores?.length; i++) {
    //         if(this.state.scores[i].puntuacion > this.props.refScores[i]?.puntajeReferencial || !this.state.scores[i].puntuacion) {
    //             this.setState({
    //                 message: "El siguiente campo debe ser correctamente llenado: Alguno de los puntajes es incorrecto"
    //             })
    //             this.onTrigger();
    //             return;
    //         }
    //     }
    //     this.setState({
    //         message: ""
    //     });
    // }

    changeScore(event: ChangeElement) {
        let copy: Array<any> = this.state.scores;
        let valueName: string = event.target.id;
        let index: number = parseInt(valueName.charAt(valueName.length - 1)) - 1;
        copy[index].puntuacion = parseInt(event.target.value);
        this.setState({
           scores: copy,
        });
        this.onTrigger();
    }

    render() {
        const { refScores } = this.props;
        let fields: number = 0;
        return(
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td className="col-8 fs-5 p-2"><strong>Descripcion</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Referencial</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Obtenido</strong></td>
                </tr>
                {refScores && refScores.map((evaluacion: any) => {
                    fields++;
                    return(
                    <tr>
                        <td>
                            {evaluacion.descripcion}
                        </td>
                        <td align="center">
                            {evaluacion.puntaje} puntos
                        </td>
                        <td>
                            <input
                                type="number"
                                className="input col-12"
                                id={"value" + fields}
                                onChange={this.changeScore}
                                min="1"
                                max={evaluacion.puntaje}
                                required
                            />
                        </td>
                    </tr>)
                    })}
                </tbody>
            </table>
        );
    }
}
