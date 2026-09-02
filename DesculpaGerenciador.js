class DesculpaGerenciador {
  constructor() {
    this.storageKey = 'desculpas_esfarrapadas_db';
    this.excuses = this.loadFromStorage();
    this.editingId = null;

    this.form = document.getElementById('excuse-form');
    this.formTitle = document.getElementById('form-title');
    this.idInput = document.getElementById('excuse-id');
    this.titleInput = document.getElementById('excuse-title');
    this.categoryInput = document.getElementById('excuse-category');
    this.statusInput = document.getElementById('excuse-status');
    this.textInput = document.getElementById('excuse-text');
    this.btnSave = document.getElementById('btn-save');
    this.btnCancel = document.getElementById('btn-cancel');
    this.container = document.getElementById('excuses-container');
    this.emptyState = document.getElementById('empty-state');
    this.totalCount = document.getElementById('total-count');
    this.filterCategory = document.getElementById('filter-category');

    this.initEvents();
    this.render();
  }
}