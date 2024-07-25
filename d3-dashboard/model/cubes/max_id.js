cube(`max_id`, {
  sql_table: `public.max_id`,
  
  data_source: `default`,
  
  joins: {
    
  },
  
  dimensions: {
    
  },
  
  measures: {
    count: {
      type: `count`
    }
  },
  
  pre_aggregations: {
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
