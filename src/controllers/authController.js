const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const usuarioModel = require("../models/usuarioModel");

const Login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await usuarioModel.buscarUsuario(email);
    
        if (usuario.rows.lenght === 0) {
                    return res.status(400).json({
                        mensagem: "Usuario não encontrado"
                    })
                }
                    
                const senhaValida = await bcrypt.compare(senha, usuario.rows[0].senha);
            
                if (!senhaValida) {
                    return res.status(400).json({
                        mensagem: "Senha inválida!"
                    })
                }
                
            
                const token = jwt.sign(
                    { id: usuario.rows[0].id },
                    process.env.JWT_SECRET,
                    { expiresIn: '1h' }
                )
        
                res.json({ token })
    } catch (erro) {
         res.status(500).json({
            mensagem: "Erro interno do servidor"
        })
    }
}

module.exports = { Login };