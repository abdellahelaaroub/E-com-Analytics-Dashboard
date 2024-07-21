cube(`orders`, {
  sql_table: `public.orders`,
  
  data_source: `default`,
  
  joins: {
    users: {
      sql: `${CUBE}.user_id = ${users}.id`,
      relationship: `many_to_one`
    },
    
    products: {
      sql: `${CUBE}.product_id = ${products}.id`,
      relationship: `many_to_one`
    }
  },
  
  dimensions: {
    id: {
      sql: `id`,
      type: `number`,
      primary_key: true
    },
    
    status: {
      sql: `status`,
      type: `string`
    },
    
    created_at: {
      sql: `created_at`,
      type: `time`
    },
    
    completed_at: {
      sql: `completed_at`,
      type: `time`
    }
  },
  
  measures: {
    count: {
      type: `count`
    },
    
    number: {
      sql: `number`,
      type: `sum`
    }
  },
  
  pre_aggregations: {
    main: {
      measures: [
        orders.count
      ],
      dimensions: [
        users.city,
        users.gender
      ],
      refreshKey: {
        every: `1 hour`
      },
      timeDimension: orders.created_at,
      granularity: `day`
    }
    // Pre-aggregation definitions go here.
    // Learn more in the documentation: https://cube.dev/docs/caching/pre-aggregations/getting-started
  }
});
