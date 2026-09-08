class Desculpa {
  constructor(id, titulo, categoria, status, texto) {
    this.id = id;
    this.titulo = titulo;
    this.categoria = categoria;
    this.status = status;
    this.texto = texto;
  }
}

class GerenciadorDesculpa {
  constructor() {
    this.arrayDesculpas = [];
    this.proximoId = 1;

    this.form = document.getElementById('excuse-form');
    this.inputId = document.getElementById('excuse-id');
    this.inputTitulo = document.getElementById('excuse-title');
    this.inputCategoria = document.getElementById('excuse-category');
    this.inputStatus = document.getElementById('excuse-status');
    this.inputTexto = document.getElementById('excuse-text');
    
    this.btnSalvar = document.getElementById('btn-save');
    this.btnCancelar = document.getElementById('btn-cancel');
    this.formTitle = document.getElementById('form-title');
    
    this.container = document.getElementById('excuses-container');
    this.emptyState = document.getElementById('empty-state');
    this.contador = document.getElementById('total-count');
    this.filtroCategoria = document.getElementById('filter-category');

    this.inicializarEventos();
  }

  inicializarEventos() {
    this.form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.salvar();
    });

    this.btnCancelar.addEventListener('click', () => {
        this.resetarFormulario();
    });

    this.filtroCategoria.addEventListener('change', () => {
        this.renderizar();
    });
  }

  salvar() {

    const id = this.inputId.value;
    const titulo = this.inputTitulo.value;
    const categoria = this.inputCategoria.value;
    const status = this.inputStatus.value;
    const texto = this.inputTexto.value;

    if (id) {

        const dsclpIndex = this.arrayDesculpas.findIndex(d => d.id == parseInt(id));

        if (dsclpIndex !== -1) {
            this.arrayDesculpas[dsclpIndex].titulo = titulo;
            this.arrayDesculpas[dsclpIndex].categoria = categoria;
            this.arrayDesculpas[dsclpIndex].status = status;
            this.arrayDesculpas[dsclpIndex].texto = texto;
        }
    } else {

        const novaDsclp = new Desculpa(this.proximoId, titulo, categoria, status, texto);
        this.arrayDesculpas.push(novaDsclp);
        this.proximoId++;
    }

    this.renderizar();
    this.resetarFormulario();
  }

  editar(id) {
    const desculpa = this.arrayDesculpas.find(d => d.id == id);

    if (!desculpa) return;

    this.inputId.value = desculpa.id;
    this.inputTitulo.value = desculpa.titulo;
    this.inputCategoria.value = desculpa.categoria;
    this.inputStatus.value = desculpa.status;
    this.inputTexto.value = desculpa.texto;

    this.formTitle.textContent = "Editar Desculpa";
    this.btnSalvar.textContent = "Atualizar";
    this.btnCancelar.classList.remove('hidden');
 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
  }

  deletar(id) {
    if (confirm('Vai deletar mesmo?')) {
        this.arrayDesculpas = this.arrayDesculpas.filter(d => d.id !== id);
        this.renderizar();
    }
  }

  renderizar() {
    this.container.innerHTML = '';

    const categoriaSelecionada = this.filtroCategoria.value;

    const listaFiltrada = categoriaSelecionada === 'todas' 
      ? this.arrayDesculpas 
      : this.arrayDesculpas.filter(d => d.categoria === categoriaSelecionada);

    this.contador.textContent = listaFiltrada.length;

    if (listaFiltrada.length === 0) {
      this.emptyState.classList.remove('hidden');
      return;
    } else {
      this.emptyState.classList.add('hidden');
    }

    listaFiltrada.forEach(desculpa => {
      const card = document.createElement('div');
      card.className = 'excuse-item';
      
      const classeStatus = this.obterClasseCSSStatus(desculpa.status);

      card.innerHTML = `
        <div class="excuse-meta">
          <span class="badge badge-category">${desculpa.categoria}</span>
          <span class="badge ${classeStatus}">${desculpa.status}</span>
        </div>
        <h3>${desculpa.titulo}</h3>
        <p>${desculpa.texto}</p>
        <div class="excuse-actions">
          <button type="button" class="btn btn-small btn-edit" onclick="app.editar(${desculpa.id})">Editar</button>
          <button type="button" class="btn btn-small btn-delete" onclick="app.deletar(${desculpa.id})">Excluir</button>
        </div>
      `;

      this.container.appendChild(card);
    });
  }

  resetarFormulario() {
    this.form.reset();
    this.inputId.value = '';

    this.formTitle.textContent = "Nova Desculpa";
    this.btnSalvar.textContent = "Salvar Desculpa";
    this.btnCancelar.classList.add('hidden');
  }

  obterClasseCSSStatus(status) {
    switch(status) {
      case 'Deu bom': return 'badge-status-bom';
      case 'Deu ruim': return 'badge-status-ruim';
      case 'Já tá manjada': return 'badge-status-manjada';
      default: return 'badge-category';
    }
  }
}

const app = new GerenciadorDesculpa();