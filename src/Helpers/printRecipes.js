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
      {
        text: 'Receita de Hoje',
        bold: true,
        fontSize: 32,
        alignment: 'center',
        margin: [0, 0, 0, 32],
      },
      {
        text: `Vamos fazer ${this.impressionData.nome} ?`,
        fontSize: 16,
        alignment: 'center',
        margin: [0, 0, 0, 24],
      },
      {
        text: `Tempo de preparo é de ${this.impressionData.tempo_preparo_minutos} minutos e renderá ${this.impressionData.porcoes} porções`,
        fontSize: 12,
        margin: [0, 0, 0, 24],
      },
      {
        text: 'Ingredientes',
        bold: true,
        fontSize: 24,
        alignment: 'center',
        margin: [0, 0, 0, 24],
      },
      {
        ul: this.impressionData.ingredientes
          .split(',')
          .map((ingredient) => [ingredient]),
        fontSize: 16,
        margin: [0, 0, 0, 24],
      },
      {
        text: 'Modo de Preparo',
        bold: true,
        fontSize: 24,
        alignment: 'center',
        margin: [0, 0, 0, 24],
      },
      {
        ul: this.impressionData.modo_preparo
          .split(',')
          .map((prepair) => [prepair]),
        fontSize: 16,
        margin: [0, 0, 0, 24],
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
