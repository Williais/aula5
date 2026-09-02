class Desculpa{

  constructor(id, titulo, categoria, status, texto) {
    this.id = id || Date.now().toString();
    this.titulo = titulo;
    this.categoria = categoria;
    this.status = status;
    this.texto = texto;
  }
}