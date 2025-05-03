//Instalar "npm i express -E"
//Configuración package.json con "start":"node --watch app.js"
//Para iniciar el servidor "npm start"

//CRUD (Crear, Leer, Actualizar, Eliminar) en una lista de usuarios

const express=require('express'); //Requerimos express
const PORT=3000; //Definimos el puetor de salida para el servidor

//Usuariso de inicio para la aplicación
let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];


const app=express(); //Ejecutamos el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//READ USUARIOS (CHECK)
app.get('/',(req,res)=>{
    res.send(`
            <h1>LISTA DE USUARIOS</h1>
            <ul>
                ${usuarios.map((usuario)=>`<li>Nombre: <a href="/usuarios/${usuario.nombre}">${usuario.nombre}</a></li>`).join("")}
            </ul>
            <h2> Introduce un usuario</h2>
            <form action="/usuarios" method="post">
            <label for"nombre">Nombre: </label>
            <input tipe="text" name="nombre" requiered> <br>
            <label for"edad">Edad: </label>
            <input tipe="text" name="edad" requiered> <br>
            <label for"lugarProcedencia">Lugar de procedencia: </label>
            <input tipe="text" name="lugarProcedencia" requiered> <br>
            <button type="submit">Agregar usuario</button>
            </form>
        `);
        usuarios.map((usuario)=>console.log(usuario.id,usuario.nombre, usuario.edad, usuario.lugarProcedencia));
        //usuarios.map((usuario)=>console.log(usuario.nombre));
        reloadUser();
})


//Agregamos un usuario a la lista dada en un inicio
app.post('/usuarios',(req,res)=>{ //Obtenemos los datos introducidos por el usuario en la página
    const newUser={
        id:usuarios.length+1,
        nombre:req.body.nombre, //recoge el name con el valor nombre
        edad:parseInt(req.body.edad), //Parseamos para que sea un número y no un texto
        lugarProcedencia:req.body.lugarProcedencia //recoge el name con el valor lugar de procedencia
    }
    usuarios.push(newUser); //Agregamos un nuevo usuario a la lista de usuarios
    reloadUser();
    res.redirect('/'); //Redirigimos a la página principal para que se añada el nuevo usuario.
})

//Funcion para crear un get con los usuarios
function reloadUser(){
    //console.log("funcion")
    usuarios.forEach(usuario=>{
        app.get(`/usuarios/${usuario.nombre}`,(req,res)=>{
            res.send(`
                <h1>USUARIO ${usuario.nombre} </h1>
                <ul>
                    <li>Id: ${usuario.id}</li>
                    <li>Nombre: ${usuario.nombre}</li>
                    <li>Edad: ${usuario.edad}</li>
                    <li>Procedencia: ${usuario.lugarProcedencia}</li>
                </ul>
                <a href="/"><button type="submit" href="/">Volver lista usuarios</button></a>
                `);
                })
    })
}





//Servidor en modo escucha por el puerto PORT
app.listen(PORT,()=>{
    console.log(`Pueto activo http://localhost:${PORT}`)
})