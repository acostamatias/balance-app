import axios from "axios"
import React, {useState,useEffect} from "react"

const Balance = (props) => {
    const [balance, setBalance] = useState({})

    useEffect(() => {
        getBalance()
        getUltimasOperaciones()
    },[])

    const getBalance = async () => {
        await axios.get('http://localhost:4000/balance/').then(
            (res) => {
                setBalance(res.data[0])
            }
        )
    }

    const getUltimasOperaciones = async () => {
        await axios.get('http://localhost:4000/ultimas-operaciones').then(
            (res) => {
                props.setOperations(res.data)
                console.log(res.data)
            }
        )
    }

    return(
        <div className="container"> 
            <div className="row"> 
                <div 
                    className="col-lg-5 col-sm-12 text-center card shadow-sm mt-5 d-flex align-items-center bg-success text-white me-3 py-3"
                >
                    <div className="my-auto">
                        <h1>Balance total</h1>
                        <h2>${Object.keys(balance).length > 0 && balance.balance}</h2>
                    </div>
                </div>

                <div className="col-sm-12 col-lg-6 table-responsive-lg border mt-5 bg-white shadow-sm rounded p-3">
                    <h2 className="text-center">Últimas operaciones</h2>
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr>
                                <th scope="col">Concepto</th>
                                <th scope="col">Monto</th>
                                <th scope="col">Tipo</th>
                                <th scope="col">Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.operations !== 'error' ? (
                                props.operations.map(item => (
                                    <tr key={item.operacionesId}>
                                        <td>{item.operacionesConcepto}</td>
                                        <td>${item.operacionesMonto}</td>
                                        <td>{item.relaTipo === 1 ? "Ingreso" : "Egreso"}</td>
                                        <td>{item.fecha}</td>
                                    </tr>
                                ))) : (
                                    <></>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Balance

