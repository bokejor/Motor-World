import React, { useState } from 'react';
import Logo from './logoMoto.jpg';
import { rutaAPI } from '../../config/Config';
import $ from "jquery";


export default function Login() {

    /*=============================================
    HOOK PARA INICIAR SESIÓN
    =============================================*/

    const [administradores, iniciarSesion] = useState({

        email: "",
        password: ""

    });

    /*=============================================
    CAPTURAMOS CAMBIOS DEL FORMULARIO PARA EJECUTAR LA FUNCIÓN DEL HOOK
    =============================================*/

    const cambiaForm = e => {

        iniciarSesion({

            ...administradores,
            [e.target.name]: e.target.value

        })

    }

    /*=============================================
    EJECUTAMOS EL SUBMIT
    =============================================*/

    const login = async e => {

        $(".alert").remove();

        e.preventDefault();

        const result = await loginAPI(administradores);

        if (result.status !== 200) {

            $("button[type='submit']").before(`<div class="alert alert-danger">${result.message}</div>`)


        } else {

            localStorage.setItem("ACCESS_TOKEN", result.token);
            localStorage.setItem("ID", result.payload._id);
            localStorage.setItem("USUARIO", result.payload.email);

            window.location.href = "/";
        }

    }


    /*=============================================
    	RETORNAMOS LA VISTA
    =============================================*/



    return (

<div className="login-page" style={{ minHeight: "512.391px" }}>

<div className="login-box">

    <div className="login-logo">

        <img
            alt="AdminLTE Logo"
            className="brand-image elevation-3"
            style={{ opacity: 0.8 }}
            src={Logo}
        />

    </div>			

    <div className="card">

        <div className="card-body login-card-body">

            <p className="login-box-msg">

                Llena los campos para iniciar sesión

            </p>

            <form onChange={cambiaForm} onSubmit={login}>

                <div className="input-group mb-3">

                    <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        name="email"
        
                    />

                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-user"></span>
                        </div>
                    </div>

                </div>

                <div className="input-group mb-3">

                    <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        name="password"
                    
                    />

                    <div className="input-group-append">
                        <div className="input-group-text">
                            <span className="fas fa-lock"></span>
                        </div>
                    </div>
        
                </div>

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                >
                    Ingresar
                </button>

            </form>

        </div>

    </div>

</div>

</div>


    );
}
/*=============================================
PETICIÓN POST PARA LOGIN
=============================================*/

const loginAPI = data => {

    const url = `${rutaAPI}/auth/admin`;

    const params = {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {

            "Content-Type": "application/json"
        }

    }

    return fetch(url, params).then(response => {


        return response.json();

    }).then(result => {

        return result;

    }).catch(err => {

        console.log(err);

        return err;

    })

}