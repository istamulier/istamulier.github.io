import _ from 'lodash';
import './styles/main.css'


  const sample = [
      {
    state: 'VT',
        value: -762,
        color: '#000000'
      },

      {
    state: 'NH',
      value: -582,
        color: '#fbcb39'
      },
    {
      state: 'NE',
      value: -298,
      color: '#00a2ee'
    },
    {
      state: 'NV',
      value: -257,
      color: '#00a2ee'
    },
    {
      state: 'KS',
      value: -188,
      color: '#00a2ee'
    },
    {
      state: 'NM',
      value: -179,
      color: '#00a2ee'
    },
    {
      state: 'CT',
      value: -151,
      color: '#00a2ee'
    },
    {
      state: 'IA',
      value: -151,
      color: '#00a2ee'
    },
    {
      state: 'CO',
      value: -145,
      color: '#00a2ee'
    },
    {
      state: 'WV',
      value: -125,
      color: '#00a2ee'
    },
    {
      state: 'ME',
      value: -122,
      color: '#00a2ee'
    },

    {
      state: 'ID',
      value: -120,
      color: '#00a2ee'
    },
    {
      state: 'DC',
      value: -117,
      color: '#00a2ee'
    },
    {
      state: 'OR',
      value: -114,
      color: '#00a2ee'
    },
    {
      state: 'WY',
      value: -108,
      color: '#00a2ee'
    },
    {
      state: 'DE',
      value: -106,
      color: '#00a2ee'
    },
    {
      state: 'CA',
      value: -104,
      color: '#00a2ee'
    },
    {
      state: 'NY',
      value: -104,
      color: '#00a2ee'
    },
    {
      state: 'WI',
      value: -100,
      color: '#00a2ee'
    },
    {
      state: 'TX',
      value: -95,
      color: '#00a2ee'
    },
    {
      state: 'RI',
      value: -78,
      color: '#00a2ee'
    },
    {
      state: 'PA',
      value: -73,
      color: '#00a2ee'
    },
    {
      state: 'OK',
      value: -53,
      color: '#00a2ee'
    },
    {
      state: 'WA',
      value: -50,
      color: '#00a2ee'
    },
    {
      state: 'IL',
      value: -42,
      color: '#00a2ee'
    },
    {
      state: 'AZ',
      value: -37,
      color: '#00a2ee'
    },
    {
      state: 'KT',
      value: -30,
      color: '#00a2ee'
    },
    {
      state: 'AL',
      value: -20,
      color: '#00a2ee'
    },

    {
      state: 'MS',
      value: 16,
      color: '#fbcb39'
    },
    {
      state: 'VA',
      value: 16,
      color: '#00a2ee'
    },
      {
    state: 'LA',
        value: 29,
        color: '#fbcb39'
      },
      {
    state: 'MD',
        value: 36.0,
        color: '#007bc8'
      },
      {
    state: 'MO',
        value: 41,
        color: '#65cedb'
      },
      {
    state: 'MN',
        value: 99,
        color: '#ff6e52'
      },
      {
    state: 'SC',
        value: 118,
        color: '#f9de3f'
      },
      {
    state: 'ND',
        value: 123,
        color: '#5d2f8e'
      },
      {
    state: 'SD',
        value: 140,
        color: '#008fc9'
      },
      {
    state: 'OH',
        value: 162,
        color: '#507dca'
      }
    ];



  const svg = d3.select('svg');
    const svgContainer = d3.select('#container');

    const margin = 80;
    const width = 1000 - 2 * margin;
    const height = 570 - 2 * margin;

    const stateFundingillustration = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
      


svg.append('text')
          .attr('class', 'label')
          .attr('x', width / 1 + margin)
          .attr('y', height + margin * 1.5)
          .attr('text-anchor', 'middle')
          .text('states')
        

        svg.append('text')
          .attr('class', 'title')
          .attr('x', width / 2 + margin)
          .attr('y', 40)
          .attr('text-anchor', 'middle')
          .text('A 10% increase in students of color is associated with school district funding changes of:')

        svg.append('text')
          .attr('class', 'source')
          .attr('x', width - margin / 2)
          .attr('y', height + margin * 1.7)
          .attr('text-anchor', 'start')
          .text('Source:2016 DOE expenditure data')

    const xScale = d3.scaleBand()
      .range([0, width])
      .domain(sample.map((s) => s.state))
      .padding(.2)

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([-900, 200]);

    // vertical grid lines
    // const makeXLines = () => d3.axisBottom()
    //   .scale(xScale)

    const makeYLines = () => d3.axisLeft()
      .scale(yScale)

    stateFundingillustration.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale));

    stateFundingillustration.append('g')
      .call(d3.axisLeft(yScale));


    stateFundingillustration.append('g')
      .attr('class', 'grid')
      .call(makeYLines()
        .tickSize(-width, 0, 0)
        .tickFormat('')
      )
    const barGroups = stateFundingillustration.selectAll()
      .data(sample)
      .enter()
      .append('g')

    barGroups
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (g) => xScale(g.state))
      .attr('y', (g) => yScale(g.value))
      .attr('height', (g) => height - yScale(g.value))
      .attr('width', xScale.bandwidth())
      .on('mouseenter', function (actual, i) {
    d3.selectAll('.value')
      .attr('opacity', 0)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (a) => xScale(a.state) - 5)
          .attr('width', xScale.bandwidth() + 10)

        const y = yScale(actual.value)

        line = stateFundingillustration.append('line')
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

        barGroups.append('text')
          .attr('class', 'divergence')
          .attr('x', (a) => xScale(a.state) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('fill', 'white')
          .attr('text-anchor', 'middle')
          .text((a, idx) => {
            const divergence = (a.value - actual.value).toFixed(1)
            //ask Ryan about this-- showing divergence stuff
            let text = ''
            if (divergence > 0) text += '+'
            text += `${divergence}`

            return idx !== i ? text : '';
          })

      })
      //test d3 mouseleave thing, and change opacity maybe?
      .on('mouseleave', function () {
    d3.selectAll('.value')
      .attr('opacity', 1)

        d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 1)
          .attr('x', (a) => xScale(a.state))
          .attr('width', xScale.bandwidth())

        stateFundingillustration.selectAll('#limit').remove()
        stateFundingillustration.selectAll('.divergence').remove()
      })

    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('x', (a) => xScale(a.state) + xScale.bandwidth() / 2)
      .attr('y', (a) => yScale(a.value) + 30)
      .attr('text-anchor', 'middle')
      .text((a) => `${a.value}`)

    svg
      .append('text')
      .attr('class', 'label')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Decrease/Increase in per pupil expenditure (USD)')
      


