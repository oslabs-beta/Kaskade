// require in hdr histogram and utilities
const hdr = require('hdr-histogram-js');
const histogramUtil = require('hdr-histogram-percentiles-obj');

hdr.initWebAssemblySync();

const createHistogram = (data) => {

  const histogram = hdr.build({ useWebAssembly: true });

  data.forEach((value) => {
    histogram.recordValue(value)
  })
  
  // console.log(histogram.minNonZeroValue);
  // console.log(histogram.maxValue);
  // console.log(histogram.mean);
  // console.log(histogram.stdDeviation);
  // console.log(histogram.getValueAtPercentile(50));
  // console.log(histogram.summary);

  // below code adds additional percentiles to the returned statistics object
  const resultWithPercentiles = histogramUtil.addPercentiles(histogram, histogramUtil.histAsObj(histogram, histogram.totalCount))
  console.log(resultWithPercentiles)

  // free up memory once histogram is no longer needed
  histogram.destroy();
  return
}

const latencyHistogram = createHistogram([0,2,4,6,8,10])

// may need to include functionality to encode and decode the histogram for performance purposes

// export the module
module.exports = createHistogram;