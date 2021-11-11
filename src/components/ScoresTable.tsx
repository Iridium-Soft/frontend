import React, { Component } from 'react';

type ChangeElement = React.ChangeEvent<HTMLInputElement>;
type Props = {
    parentCallback: any,
}

type State = {
    scores: Array<number>,
    refScores: Array<number>,
}

export default class ScoresTable extends Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            scores: [],
            refScores: [15, 10, 30, 10, 10, 15, 10],
        }

        this.onTrigger = this.onTrigger.bind(this);
        this.changeScore = this.changeScore.bind(this);
    }

    onTrigger() {
        this.props.parentCallback(this.state.scores);
    }

    changeScore(event: ChangeElement) {
        let copy: Array<number> = this.state.scores;
        let valueName: string = event.target.id;
        let index: number = parseInt(valueName.charAt(valueName.length - 1)) - 1;
        copy[index] = parseInt(event.target.value);
        this.setState({
           scores: copy,
        });
    }

    render() {
        const { refScores } = this.state;
        return(
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td className="col-8 fs-5 p-2"><strong>Descripcion</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Referencial</strong></td>
                    <td className="col-2 fs-5 p-2"><strong>Puntaje Obtenido</strong></td>
                </tr>
                <tr>
                    <td>
                        Cumplimiento de especificaciones del proponente
                    </td>
                    <td align="center">
                        15 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value1"
                            name="value1"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[0]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Claridad en la organización de la empresa proponente
                    </td>
                    <td align="center">
                        10 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value2"
                            name="value2"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[1]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Cumplimiento de especificaciones técnicas
                    </td>
                    <td align="center">
                        30 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value3"
                            name="value3"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[2]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Claridad en el proceso de desarrollo
                    </td>
                    <td align="center">
                        10 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value4"
                            name="value4"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[3]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Plazo de ejecución
                    </td>
                    <td align="center">
                        10 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value5"
                            name="value5"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[4]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Precio total
                    </td>
                    <td align="center">
                        15 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value6"
                            name="value6"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[5]}
                            required
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        Uso de herramientas en el proceso de desarrollo
                    </td>
                    <td align="center">
                        10 puntos
                    </td>
                    <td>
                        <input
                            type="number"
                            className="input col-12"
                            id="value7"
                            name="value7"
                            onChange={this.changeScore}
                            min="1"
                            max={refScores[6]}
                            required
                        />
                    </td>
                </tr>
                </tbody>
            </table>
        );
    }
}
