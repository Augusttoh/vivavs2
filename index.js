const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

const Produto = require("./database/Produto");
const usuario1 = require("./database/usuario1");
const Termometro = require("./database/Termometro");



connection
    .authenticate()
    .then(() => {
        console.log("conexao feita com o db");
    })
    .catch((msgErro) => {
        console.log(msgErro);
    })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//EJS como view engine
app.set('view engine', 'ejs');

//definindo a pasta de arquivos estaticos
app.use(express.static('public'));

app.listen(8080, () => {
    console.log("app rodando");
});
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/produtoslist", (req, res) => {
    Produto.findAll({ raw: true }).then(produtos => {
        //console.log(produtos);
        res.render("produtoslist", {
            produtos: produtos
        });
    })
    //res.render("index");
});

app.get("/usuarioslist", (req, res) => {
    usuario1.findAll({ raw: true }).then(usuarios => {
        //console.log(usuario);
        res.render("usuariosList", {
            usuarios: usuarios
        });
    })
    //res.render("index");
});

app.post('/SalvarLoginlogin', async (req, res) => {
    const { emailempresa, senha } = req.body;
    const usuario = await Produto.findOne({ where: { emailempresa, senha } });

    if (usuario) {

        res.render('admin');
    } else {
        res.render("login")
    }
});

app.post('/Salvarusuario1', async (req, res) => {
    const { login, senha_usuario } = req.body;
    const perfil = await usuario1.findOne({ where: { login, senha_usuario } });

    if (perfil) {

        res.render('perfil2');
    } else {
        res.render("login2")
    }
});

app.get("/perfil", (req, res) => {
    res.render("../views/perfil");
});

app.get("/perfil2", (req, res) => {
    res.render("../views/perfil2");
});

app.get("/login2", (req, res) => {
    res.render("../views/login2");
});

app.get("/logar", (req, res) => {
    res.render("../views/logar");
});

app.get("/cadastrar", (req, res) => {
    res.render("../views/cadastrar");
});

app.get("/login", (req, res) => {
    res.render("../views/login");
});
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/admin", (req, res) => {
    res.render("../views/admin");
});

app.get("/termometro", (req, res) => {
    res.render("../views/termometro");
});

app.get("/Ergonomia", (req, res) => {
    res.render("../views/Ergonomia");
});

app.get("/saudemental", (req, res) => {
    res.render("../views/saudemental");
});

app.get("/nr", (req, res) => {
    res.render("../views/nr");
});

app.get("/ansiedade", (req, res) => {
    res.render("../views/ansiedade");
});

app.get("/direitos", (req, res) => {
    res.render("../views/direitos");
});

app.get("/depressao", (req, res) => {
    res.render("../views/depressao");
});

app.get("/emocoes", (req, res) => {
    res.render("../views/emocoes");
});

app.get("/burnout", (req, res) => {
    res.render("../views/burnout");
});

app.get("/epi", (req, res) => {
    res.render("../views/epi");
});

app.get("/inteligencia", (req, res) => {
    res.render("../views/inteligencia");
});



app.get("/usuario1", (req, res) => {
    res.render("../views/usuario1");
});

app.post("/Salvarusuario1", (req, res) => {
    var nome_usuario = req.body.nome_usuario;
    var genero = req.body.genero;
    var idade = req.body.idade;
    var empresa_id = req.body.empresa_id;
    var funcao = req.body.funcao;
    var setor = req.body.setor;
    var email_usuario = req.body.email_usuario;
    var celular_usuario = req.body.celular_usuario;
    var login = req.body.login;
    var senha_usuario = req.body.senha_usuario;
    usuario1.create({
        nome_usuario: nome_usuario,
        genero: genero,
        idade: idade,
        empresa_id: empresa_id,
        funcao: funcao,
        setor: setor,
        email_usuario: email_usuario,
        celular_usuario: celular_usuario,
        login: login,
        senha_usuario: senha_usuario
    }).then(() => {
        res.redirect("/");
    });

});

app.get("/produto", (req, res) => {
    res.render("produto");
});

app.post("/salvarProduto", (req, res) => {
    var nomeempresa = req.body.nomeempresa;
    var qtdfuncionarios = req.body.qtdfuncionarios;
    var emailempresa = req.body.emailempresa;
    var celularempresa = req.body.celularempresa;
    var senha = req.body.senha;
    Produto.create({
        nomeempresa: nomeempresa,
        qtdfuncionarios: qtdfuncionarios,
        emailempresa: emailempresa,
        celularempresa: celularempresa,
        senha: senha
    }).then(() => {
        res.redirect("/");
    });

});

app.post('/salvarEmoji', (req, res) => {
    const emojiName = req.body.emojiName;
    const emojiValue = req.body.emojiValue;
    console.log("nome "+emojiName);
    console.log("valor "+emojiValue);
    /*termometro.create({
        emojiName: emojiName
}).then(()=>{
    res.redirect("perfil2");
});*/
    res.redirect("perfil2");

});






