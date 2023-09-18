
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xxoajdbdgbwuwqiivypr.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b2FqZGJkZ2J3dXdxaWl2eXByIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwNDQzNDAsImV4cCI6MjAxMDYyMDM0MH0.VcXucWjzNd87VQ9vbZYKSMtWH17ISOIk0Z4fE8vJ9vQ'; // Replace with your Supabase API key

const supabase = createClient(supabaseUrl, supabaseKey);



async function fetchAllData() {
    const { data, error } = await supabase
      .from('my_table') // Replace with your table name
      .select('*'); // Select all columns, you can specify specific columns if needed
  
    if (error) {
      console.error(error);
      return;
    }
  
    console.log(data);
  }
  
  fetchAllData();
  