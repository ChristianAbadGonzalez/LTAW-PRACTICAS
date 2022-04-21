// Modulos utilizados
const http = require('http'),
      url = require('url'),
      fs = require('fs'),
      PUERTO = 9090

// DEFINICIÓN DE LA BASE DE DATOS DE LOS PRODUCTOS
    // productos y precios
let productos = {'Lenovo IdeaPad 3 15IGL05 8 GB Intel Celeron N4020 256 GB SSD': 399,
                 'Asus Chromebook Flip C214MA-BU0410 4 GB Intel Celeron N4020 32 GB eMMC': 199,
                 'Lenovo IdeaPad 3 Chromebook 4 GB Intel Celeron N4020 64 GB eMMC': 294.66,
                 'HP Chromebook 14a-NA0004NS 4 GB Intel Celeron N4020 64 GB eMMC': 299,
                 'Asus E410MA-EK007TS 4 GB Intel Celeron N4020 64 gb eMMC': 248.99,
                 'Acer Extensa 15 EX215-22-R84H 8 GB AMD Ryzen 5 3500U 512 GB SSD': 508.22,
                 'Lenovo V14 G2-ITL 82KA001BSP 8 GB Intel Core i3-1115G4 256 GB SSD': 513.10,
                 'Asus ExpertBook L1500CDA-EJI480R 8 GB AMD Ryzen 3 3250U 256 GB SSD': 551.50,
                 'Asus VivoBook Pro 15 M3500QC-KJ161T 16 GB AMD Ryzen 7 5800H NVIDIA RTX 3050 512 GB SSD': 999.99,
                 'MSI GF63 Thin 11SC-440XES 8 GB Intel Core i5 11400H NVIDIA GTX 1650 512 GB SSD': 849.99,
                 'MSI WS63 8SL-013ES Vpro 32 GB Intel Core i7-8850H NVIDIA P4200 512 GB SSD + 1TB HDD': 5930.85,
                 'Asus Rog Strix SCAR 17 G733QS-K4170T 64 GB AMD Ryzen 9 5900HX NVIDIA 3080 1 TB SSD + 1 TB HDD': 3319.63,
                 'HP ZBook Fury 17 G7 32 GB Intel Core i9-10885 NVIDIA Quadro RTX 5000 1 TB SSD': 5657.93,
                 'Apple Macbook Pro 16 GB Intel Core i9 Radeon Pro 5500M 1 TB SSD': 3604.28,
                 'Acer ConceptD 7 Pro CN715-72P-798Z 32 GB Intel Core i7-10875 NVIDIA Quadro RTX 5000 1 TB SSD': 3181.73,
                },
    // ESTANDARIZACION DE LAS COOKIES QUE SE INSERTAN.
    user_template = {'password': '',
                     'cart':{
                       'Lenovo IdeaPad 3 15IGL05 8 GB Intel Celeron N4020 256 GB SSD': 0,
                       'Asus Chromebook Flip C214MA-BU0410 4 GB Intel Celeron N4020 32 GB eMMC': 0,
                       'Lenovo IdeaPad 3 Chromebook 4 GB Intel Celeron N4020 64 GB eMMC': 0,
                       'HP Chromebook 14a-NA0004NS 4 GB Intel Celeron N4020 64 GB eMMC': 0,
                       'Asus E410MA-EK007TS 4 GB Intel Celeron N4020 64 gb eMMC': 0,
                       'Acer Extensa 15 EX215-22-R84H 8 GB AMD Ryzen 5 3500U 512 GB SSD': 0,
                       'Lenovo V14 G2-ITL 82KA001BSP 8 GB Intel Core i3-1115G4 256 GB SSD': 0,
                       'Asus ExpertBook L1500CDA-EJI480R 8 GB AMD Ryzen 3 3250U 256 GB SSD': 0,
                       'Asus VivoBook Pro 15 M3500QC-KJ161T 16 GB AMD Ryzen 7 5800H NVIDIA RTX 3050 512 GB SSD': 0,
                       'MSI GF63 Thin 11SC-440XES 8 GB Intel Core i5 11400H NVIDIA GTX 1650 512 GB SSD': 0,
                       'MSI WS63 8SL-013ES Vpro 32 GB Intel Core i7-8850H NVIDIA P4200 512 GB SSD + 1TB HDD': 0,
                       'Asus Rog Strix SCAR 17 G733QS-K4170T 64 GB AMD Ryzen 9 5900HX NVIDIA 3080 1 TB SSD + 1 TB HDD': 0,
                       'HP ZBook Fury 17 G7 32 GB Intel Core i9-10885 NVIDIA Quadro RTX 5000 1 TB SSD': 0,
                       'Apple Macbook Pro 16 GB Intel Core i9 Radeon Pro 5500M 1 TB SSD': 0,
                       'Acer ConceptD 7 Pro CN715-72P-798Z 32 GB Intel Core i7-10875 NVIDIA Quadro RTX 5000 1 TB SSD': 0,
                       'total': 0.0}
                     }

const server = http.createServer((req, res) => {
  let q = url.parse(req.url, true),
      cookie = req.headers.cookie,
      params = q.query,
      filename = '',
      mime = '',
      ext = '',
      prod_search = [],
      prod_show = []

  if (q.pathname != '/') {
    ext = q.pathname.split('.')[q.pathname.split('.').length - 1].toLowerCase()
  }

  switch (ext) {
    case '':
      filename = './layout/tienda.html'
      mime = 'text/html'
      code = 200
      break
    case 'register_form':
      if (req.method == 'POST') {
        req.on('data', chunk => {
          data = chunk.toString()
          console.log(data)
          let new_user = true,
              cname = '',
              name = data.split('&')[0].split('=')[1]
          if (cookie) {
            // si existen cookies anteriores comprobamos si el usuario ya esta
            // registrado
            for (var i = 0; i < cookie.split('; ').length; i++) {
              cname = cookie.split('; ')[i].split('=')[0]
              if (cname == name) {
                new_user = false
                break
              }
            }
          }
          if (new_user) {
            // si el usuario no estaba registrado, se le crea una nueva cookie
            user = user_template
            user.password = data.split('&')[1].split('=')[1]
            res.setHeader('Set-Cookie', name + '=' + JSON.stringify(user))
          }
          return
        })
      }
      filename = './layout/tienda.html'
      mime = 'text/html'
      break
    case 'cart': // PETICION GET: http://localhost:PORT/action.cart?user=NOMBRE
      let cname = '',
          sent = false
      for (var i = 0; i < cookie.split('; ').length; i++) {
        cname = cookie.split('; ')[i].split('=')[0]
        if (cname == params.user) {
          cart = JSON.parse(cookie.split(';')[i].split('=')[1])
          content = JSON.stringify(cart.cart)
          sent = true
        }
      }
      if (!sent) {
        content = ''
      }
      res.setHeader('Content-Type', 'application/json')
      res.write(content)
      res.end()
      break
    case 'pay':
      if (req.method == 'POST') {
        req.on('data', chunk => {
          data = chunk.toString()
          let cname = '',
              name = data.split('&')[0].split('=')[1],
              password = data.split('&')[1].split('=')[1]
          for (var i = 0; i < cookie.split('; ').length; i++) {
            cname = cookie.split('; ')[i].split('=')[0]
            if (cname == name) {
              user = JSON.parse(cookie.split('; ')[i].split('=')[1])
              if (password == user.password) {
                user.cart = user_template.cart
                res.setHeader('Set-Cookie', name + '=' + JSON.stringify(user))
                filename = './layout/compra-ok.html'
              } else {
                filename = './layout/error.html'
              }
            }
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write('<h1>Error 404: File not Found</h1>')
              return res.end()
            } else {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              return res.end()
            }
          })
          return
        })
      }
      break
    case 'buy':
      console.log(req.method);
      if (req.method == 'POST') {
        req.on('data', chunk => {
          let data = chunk.toString(),
              content = '',
              cname = '',
              name = data.split('&')[0].split('=')[1],
              prod = data.split('&')[1].split('=')[1].replace(/[+]/gi,' ')
          if (cookie) {
            for (var i = 0; i < cookie.split('; ').length; i++) {
              cname = cookie.split('; ')[i].split('=')[0]
              console.log(cname);
              if (cname == name) {
                content = name + '='
                let cart = JSON.parse(cookie.split('; ')[i].split('=')[1])
                cart.cart[prod] += 1
                cart.cart.total = Math.round((cart.cart.total + productos[prod])*100)/100
                content += JSON.stringify(cart)
                console.log(content);
              }
            }
          }
          if (content) {
            res.setHeader('Set-Cookie', content)
            filename = './layout/tienda.html'
          } else {
            filename = './layout/registro.html'
          }
          fs.readFile(filename, (err, data) => {
            if (err) {
              res.writeHead(404, {'Content-Type': 'text/html'})
              res.write('<h1>Error 404: File not Found</h1>')
              return res.end()
            } else {
              res.writeHead(200, {'Content-Type': 'text/html'})
              res.write(data)
              return res.end()
            }
          })
          return
        })
      }
      break
    
    case 'js':
      filename = './static/js' + q.pathname
      mime = 'application/javascript'
      break;
    
    case 'html':
      filename = './layout' + q.pathname
      mime = 'text/html'
      break
    
    case 'searchbar': // PETICION GET: http://localhost:PORT/action.searchbar?prod=PRODUCTO
    
    case 'showsearch': // PETICION GET: http://localhost:PORT/action.showsearch?prod=PRODUCTO
      for (let prod in productos) {
        if (params.prod.length > 0) {
          if (prod.toLowerCase().indexOf(params.prod.toLowerCase()) == -1) {
            prod_show.push(prod)
          } else {
            prod_search.push(prod)
          }
        }
      }
      content = (ext == 'showsearch') ? JSON.stringify(prod_show) : JSON.stringify(prod_search)
      res.setHeader('Content-Type', 'application/json')
      res.write(content)
      res.end()
      break
    
    case 'jpg':
      filename = './static/images' + q.pathname
      mime = 'images/' + ext
      break;
    
    case 'png':
      filename = './static/images' + q.pathname
      mime = 'images/' + ext
      break;
    
    case 'ico':
      filename = './static/images' + q.pathname
      mime = 'images/' + ext
      break;
    
    case 'show_cart':
      filename = './layout/cart.html'
      mime = 'text/html'
      break;
    
    case 'css':
      filename = './static/css' + q.pathname
      mime = 'text/css'
      break;
    
    case 'ttf':
      filename = './static/css' + q.pathname
      mime = 'font/ttf'
      break;
    default:
      //
  }
  
  console.log('request: ' + q.pathname + '\n\n')
  
  if (q.pathname.toLowerCase().indexOf('action.') == -1 || q.pathname.toLowerCase().indexOf('show_cart') != -1 || q.pathname.toLowerCase().indexOf('register_form') != -1) {
    fs.readFile(filename, (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.write('<h1>Error 404: File not Found</h1>')
        return res.end()
      } else {
        res.writeHead(200, {'Content-Type': mime})
        res.write(data)
        return res.end()
      }
    })
  }
}).listen(PUERTO)

console.log('Servidor en: http://localhost:' + PUERTO + '/')