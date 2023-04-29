

const qrcode = require('qrcode-terminal');
const axios = require('axios');
const express = require('express');
const handlebars = require('handlebars');
const   dotenv = require('dotenv')//.config();

const { Client , LocalAuth  } = require('whatsapp-web.js');

const puppeteer = require('puppeteer');

async function myFunction() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setDefaultTimeout(10000); // 10 segundos
  // Resto de tu código aquí
}

const http = require('http');
const codbar = ''


dotenv.config()
const app = express();
app.use(express.json())


const client = new Client({
 
    authStrategy: new LocalAuth()//,
  //  puppeteer: {
  //    args: ['--no-sandbox'],
  //    }
});


// client.on('qr', qr => {



  // qrcode.generate(qr, {small: true}, function (code) {
  //   console.log('code',code);
//   } ) 

 //});

  client.on('ready',    ()  => {

    myFunction();
  console.log('Client is ready!');

  


});



let nombre = '';
let edad = '';




client.on('message', async (message) => {


 if (message.body.toLowerCase() === 'menud'){


  await client.sendMessage(message.from, '1) Recibir comprobante de pago\n2) Revision de marcas');

  // Esperamos la respuesta del usuario
  client.on('message', async (response) => {
    // Verificamos que la respuesta sea del usuario y no del bot
    if (response.fromMe) {
      return;
    }

    // Verificamos que la respuesta contenga la palabra 'bien'
    if (response.body.includes('bien')) {
      // Respondemos con un mensaje de confirmación
      await client.sendMessage(response.from, 'Me alegra que estés bien');
    } else {
      // Respondemos con un mensaje de ánimo
      await client.sendMessage(response.from, 'Ánimo, todo va a salir bien');
    }
  });





}


 let empevo ; 
 let codigoemp
 let responses = {}; 
 let telefono 

 let respuestaa = ''
 let respuestab = ''



 
 if (message.body.toLowerCase() === 'menu'){ // verificar si el mensaje es 'empezar cuestionario'
  respuestab = message.body
 console.log( respuestab , message.body, 'body', message)

  responses = {}; // reiniciar las respuestas del usuario
 // await client.awaitMessages(message.from, '1) Recibir comprobante de pago\n2) Revision de marcas');

  await client.sendMessage(message.from, '1) Recibir comprobante de pago\n2) Revision de marcas'); // enviar la primera pregunta
// Esperar respuesta del usuario



  // Verificamos que la respuesta sea del usuario y no del bot
  
  // Esperamos la respuesta del usuario
  client.on('message', async (response) => {
    // Verificamos que la respuesta sea del usuario y no del bot
    if (response.fromMe) {
      return;
    }
  
 console.log( response.body , message.body, 'body', message)
  if (response.body.toLowerCase() === '1') {

  
  let celular = message.from;
  celular = celular.substring(0, celular.length - 5);
  
  
  responses.codigo = message.body; // almacenar la respuesta en la variable 'responses'
  codigoemp = message.body;
//  codigoemp = 226
  //console.log('codigoemp', codigoemp)


  try {
   // await   client.sendMessage(message.from, 'Ingrese codigo de empleado ' );
//   console.log('responses.codigo ',  message.body)

       //  const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empresas/empresa_pais/hn');
       const response = await axios.get(`${process.env.EVO_URL}/api/Empleado/GetByTel/${celular}`) ;
     //    const response = await axios.get(`${process.env.EVO_URL}/api/Empleado/GetById/hn${codigoemp}`);
         const data = response.data;
         empevo = data.Contenido[0].emp_CodEvo
         telefono =  data.Contenido[0].emP_TELEFONO 
   
 
         
       const ciaempresas = JSON.stringify(data.contenido)
       const empresas = JSON.stringify(data.contenido)
    
       let objeto = []
for (let prop in data.contenido) {
// console.log(`${prop}: ${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`);
objeto.push(`${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`)

}

//console.log(objeto)

//const empresa = JSON.stringify(objeto)
const empresa = JSON.stringify(objeto, null, "\n")

//console.log(JSON.stringify(objeto.slice(1, -1), null, "\n"));



 //console.log(empevo, celular )
 const str = empresa
const newStr = str.slice(1, -1)
//console.log(newStr)



       client.sendMessage(message.from, newStr);

   
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }

     try {
      //   const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empleado/GetByCiaId/422/226');
       //  const response = await axios.get(`http://rdwebsrvtst2:8093/api/ingresos/getcomprobanteempleado/${empevo}`);
       const response = await axios.get(`${process.env.EVO_URL}/api/ingresos/getcomprobanteempleado/${empevo}`);
           

       
         const data = response.data;
     //    console.log('comprobante de pago json', data.Contenido)
     //    const empresa = JSON.stringify (data.Contenido )// JSON.stringify(data, null, "\n")

       
        const filteredData = data.Contenido.map(({  tiempo,valor, descripcion ,    }) => ({  tiempo,valor, descripcion  }));
    //    console.log('filteredData', filteredData)
         let empresa = String( JSON.stringify(filteredData)) // JSON.stringify ( filteredData )   
         empresa = empresa.slice(1, -1)


         const string = 'e851e2fa-4f00-4609-9dd2-9b3794c59619'




const replacements = {
  tiempo: 'HORAS',
  valor: 'VALOR',
"}": '',
  "{": '',
  '"': '',
  ',': ' ',
  ':': ' ',
  descripcion: ' '
};



const newString  = empresa.replace(
  new RegExp(Object.keys(replacements).join('|'), 'g'),
  match => replacements[match]
);

//console.log(newString);


const palabra = newString.replace(/\\n/g, '\n')

const palabras = palabra.replace(`/\//g`, '')

//const palabras = palabra.replace(/\/g, ' ')

const mensaje = "Hola" + String.fromCharCode(10) + "Mundo";
//console.log(mensaje);


//console.log('palabra',palabras );

            
let str = message.from;

str = str.substring(0, str.length - 5);


    //  console.log('numeros',str, telefono,  )
     // console.log('empresa ', empresa)
      if(str ===   telefono   )
      {

      //  console.log('empresa dentro de telefono ', empresa)
        client.sendMessage(message.from, palabras.substring(17)   );


      }
      else{
         client.sendMessage(message.from, 'numero no registrado en la base' );

      }
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }

      }
      else if (response.body.toLowerCase() === '2' ) {

        
  let celular = message.from;
  celular = celular.substring(0, celular.length - 5);
  
  
  responses.codigo = message.body; // almacenar la respuesta en la variable 'responses'
  codigoemp = message.body;
//  codigoemp = 226
  //console.log('codigoemp', codigoemp)


  try {
   // await   client.sendMessage(message.from, 'Ingrese codigo de empleado ' );
//   console.log('responses.codigo ',  message.body)

       //  const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empresas/empresa_pais/hn');
       const response = await axios.get(`${process.env.EVO_URL}/api/Empleado/GetByTel/${celular}`) ;
     //    const response = await axios.get(`${process.env.EVO_URL}/api/Empleado/GetById/hn${codigoemp}`);
         const data = response.data;
         empevo = data.Contenido[0].emP_CODIGO
         telefono =  data.Contenido[0].emP_TELEFONO 
   
 
         
       const ciaempresas = JSON.stringify(data.contenido)
       const empresas = JSON.stringify(data.contenido)
    
       let objeto = []
for (let prop in data.contenido) {
// console.log(`${prop}: ${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`);
objeto.push(`${data.contenido[prop].cia_codigo}, ${data.contenido[prop].cia_descripcion}`)

}

//console.log(objeto)

//const empresa = JSON.stringify(objeto)
const empresa = JSON.stringify(objeto, null, "\n")

//console.log(JSON.stringify(objeto.slice(1, -1), null, "\n"));



 //console.log(empevo, celular )
 const str = empresa
const newStr = str.slice(1, -1)
//console.log(newStr)



       client.sendMessage(message.from, newStr);

   
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }

     try {
      //   const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empleado/GetByCiaId/422/226');
       //  const response = await axios.get(`http://rdwebsrvtst2:8093/api/ingresos/getcomprobanteempleado/${empevo}`);
       const response = await axios.get(`${process.env.PROMETEO_URL}/v1_1/planilla/marcacionesemp/${empevo}?token=${process.env.TOKEN}`);
           

       
         const data = response.data;
         console.log('comprobante de pago json', data.Contenido)
     //    const empresa = JSON.stringify (data.Contenido )// JSON.stringify(data, null, "\n")

       
        const filteredData = data.Contenido.map(({  marca     }) => ({  marca  }));
    //    console.log('filteredData', filteredData)
         let empresa = String( JSON.stringify(filteredData)) // JSON.stringify ( filteredData )   
         empresa = empresa.slice(1, -1)


const replacements = {
  tiempo: 'HORAS',
  valor: 'VALOR',
"}": '',
  "{": '',
  '"': '',
  ',': ' ',
  ':': ' ',
  descripcion: ' '
};



const newString  = empresa.replace(
  new RegExp(Object.keys(replacements).join('|'), 'g'),
  match => replacements[match]
);


const palabra = newString.replace(/\\n/g, '\n')

console.log('palabra', palabra)

const palabras = palabra.replace(`/\//g`, '')


console.log('palabras', palabras)

            
let str = message.from;

str = str.substring(0, str.length - 5);


    //  console.log('numeros',str, telefono,  )
     // console.log('empresa ', empresa)
      if(str ===   telefono   )
      {

      //  console.log('empresa dentro de telefono ', empresa)
        client.sendMessage(message.from, palabras   );


      }
      else{
         client.sendMessage(message.from, 'numero no registrado en la base' );

      }
       //  res.json(data);
       } catch (error) {
         console.error(error);
         res.status(500).send('Error interno del servidor');
       }




      }

    });
    

} 




});
 

 

client.initialize();
 



app.get('/qr', (req, res) => {

    
  client.on('qr', qr => {


//    const  fecha = Date.now();

    const  fecha = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric", hour:"numeric" , minute:"numeric", second:"numeric"}) 

  




    qrcode.generate(qr, {small: true}, function (code) {
      console.log(code);
    console.log('refresca Qr', fecha)


      res.send(`<!DOCTYPE html>

      <html>
     
          <head>
          <meta http-equiv="refresh" content="60">
              <title>titulo de la página</title>
          </head>
          <body>
          <div style="text-align:center" >
          </div>
         
          <h2> Codigo de QR para whassap web  ${fecha} </h2>
            <pre>${code}</pre>  
            
          </body>
      </html>`)
     // res.send(`<pre>${code}</pre>`);
    }) 
    
  
  });


  client.on('ready',    ()  => {

    console.log('Client is ready!');
  
  });


//}, 10000);


//setInterval(updateqr, 1 * 30 * 1000);




});


app.get('/api/cliente', async (req,res) => {
    try {
        const response = await axios.get('http://svapwebdev41/EvoWebApi/api/Empleado/GetByCiaId/422/226');
        const data = response.data;
        client.on('message', message => {
            if(message.body === 'hola mundo') {
                client.sendMessage(message.from, data);
            }
        });

        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error interno del servidor');
      }

   // res.send('enviar datos api')
} );

  


app.listen(3000, function () {
    console.log('La aplicación está en ejecución en http://localhost:3000');
  });


// app.get('/', function (req, res) {
//     res.send('Hola, mundo!');
//   });


