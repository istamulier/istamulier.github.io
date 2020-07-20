# BARG

This is just the tip of a larger, ongoing project in which I hope to digitize/make interactive all information in the publications of UNCF. UNCF's research on educational and funding disparities between Black and Latinx school systems vs white ones, as well as its use of bold graphics to make that data come alive, made it the perfect choice around which to center my own data visualizations. 

The first bargraph, with an interactive divergence line, was built using d3 and vanilla JS-- it tracks how with every 10% increase in POC enrollment at a school, the average government per pupil expenditure goes down in all but a handful of states.

The next figure is a choropleth I built from scratch using data I queried from the census.gov API, mapped onto a geometry/shapefile of the county of Alameda, demarcated by school district. It is still in progress in terms of its labeling, but it tracks the child poverty data I converted/joined in a geoJSON/ndjson. Hovering over each school district will soon reveal the name and data associated with each-- for now it simply produces a pink effect.

The final two figures are the first two of a series of pie charts that will ultimately make the point that even among working-class students who beat the odds and make it to college, that college attendence is clustered disproportionately among for-profit and 2-year (as opposed to 4 year) schools. 

