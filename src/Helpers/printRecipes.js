export class Impression {
  constructor(impressionData) {
    this.impressionData = impressionData;
  }

  async documentPrepare() {
    const documentBody = this.creatBody();
    const document = this.createDocument(documentBody);
    return document;
  }

  creatBody() {
    const body = [
      { text: 'Receita', style: 'header' },
      { text: `Vamos fazer ${this.impressionData.nome}` },
      {
        text: `Tempo de preparo é de ${this.impressionData.tempo_preparo_minutos} e renderá ${this.impressionData.porcoes}`,
      },
      { text: 'Modo de Preparo', style: 'header' },
      {
        ul: [
          this.impressionData.modo_preparo.split(',').map((prepair) => prepair),
        ],
      },
      { text: 'Ingredientes', style: 'header' },
      {
        ul: [
          this.impressionData.ingredientes
            .split(',')
            .map((ingredient) => ingredient),
        ],
      },
    ];

    return body;
  }

  createDocument(documentBody) {
    const document = {
      pageSize: 'A4',
      pageMargins: [14, 53, 14, 48],
      info: {
        title: 'Receitas',
      },
      content: [documentBody],
      footer(currentPage, pageCount) {
        return {
          layout: 'noBorders',
          margin: [14, 0, 14, 22],
          table: {
            widths: ['*'],
            body: [
              [
                {
                  text:
                    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________',
                  alignment: 'center',
                  fontSize: 5,
                },
              ],
              [
                [
                  {
                    text: `Página ${currentPage.toString()} de ${pageCount}`,
                    fontSize: 7,
                    alignment: 'right',
                    /* horizontal, vertical */
                    margin: [3, 0],
                  },
                  {
                    text: '© Receitas',
                    fontSize: 7,
                    alignment: 'center',
                  },
                ],
              ],
            ],
          },
        };
      },
      styles: {
        reportName: {
          fontSize: 9,
          bold: true,
          alignment: 'center',
          margin: [0, 4, 0, 0],
        },
      },
    };
    return document;
  }
}
