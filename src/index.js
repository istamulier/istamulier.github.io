import _ from 'lodash';
import './styles/main.css'


  const sample = [
      {
    state: 'Vermont',
        value: -762,
        color: '#000000'
      },

      {
    state: 'New Hampshire',
      value: -582,
      color: '#000000'
      },
      {
    state: 'Mississippi',
        value: 16,
        color: '#000000'
      },
      {
    state: 'Virginia',
        value: 16,
        color: '#00a2ee'
      },
      {
    state: 'Louisiana',
        value: 29,
        color: '#fbcb39'
      },
      {
    state: 'Maryland',
        value: 36.0,
        color: '#007bc8'
      },
      {
    state: 'Missouri',
        value: 41,
        color: '#65cedb'
      },
      {
    state: 'Minnesota',
        value: 99,
        color: '#ff6e52'
      },
      {
    state: 'South Carolina',
        value: 118,
        color: '#f9de3f'
      },
      {
    state: 'North Dakota',
        value: 123,
        color: '#5d2f8e'
      },
      {
    state: 'South Dakota',
        value: 140,
        color: '#008fc9'
      },
      {
    state: 'Ohio',
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
          .text('A 10% increase in students of color is associated with school district funding changes of...')

        svg.append('text')
          .attr('class', 'source')
          .attr('x', width - margin / 2)
          .attr('y', height + margin * 1.7)
          .attr('text-anchor', 'start')
          .text('Source: UNCF analysis of U.S. Department of Education expenditure data,adjusted for regional cost differences.')

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



