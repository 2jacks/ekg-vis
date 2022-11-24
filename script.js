const loadEKGBtn = document.querySelector('.load-ekg')

const patientSelect = document.querySelector('.patient-select')
const patientName = document.querySelector('.patient-name')

let usersId = {
  'Ноздрин Антон': '1',
  'Яркинбаев Радмир': '2',
  'Николаев Алексей': '3',
  'Кременко Кремень': '4',
  'Черняев Беляк': '5'
}

patientSelect.addEventListener('change', e => {
  let user = e.target.value
  patientName.innerHTML = e.target.value
  fetch(`http://127.0.0.1:3000/data?patient=${usersId[user]}`)
    .then(res => res.json())
    .then(data => {
      let output = data.map(item => Number(item))
      let xAxis = data.map((item, index) => index)
      Highcharts.stockChart('chart', {
        chart: {
          type: 'line',
          zoomType: 'x',
          resetButton: {
            position: {
              ailgn: 'top',
              veticalAlign: 'top',
              x: 0,
              y: 0
            }
          }
        },
        title: {
          text: 'ЭКГ'
        },
        rangeSelector: { enabled: false },
        scrollbar: {
          enabled: true
        },
        navigator: {
          xAxis: { visible: true }
        },
        xAxis: {
          categories: xAxis,
          type: 'logarithmic',
          labels: { enabled: false }
        },
        yAxis: {
          title: {
            text: 'MLII'
          }
        },
        series: [
          {
            pointInterval: 800,
            name: 'График',
            data: output.slice(0, 10000),
            tooltip: {
              valueDecimals: 1
            }
          }
        ],
        zoomEnabled: true
      })
    })
})

loadEKGBtn.addEventListener('click', () => {})
