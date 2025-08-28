const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'onboard_iq_demo',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function initDatabase() {
  console.log('Initializing OnboardIQ Demo Database...');
  
  try {
    // Create providers table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS provider (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        vertical VARCHAR(100),
        active BOOLEAN DEFAULT true,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created providers table');

    // Create provider_contact table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS provider_contact (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        provider_id UUID REFERENCES provider(id),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone VARCHAR(50),
        roles TEXT,
        platform_vertical_market_ids TEXT,
        active BOOLEAN DEFAULT true,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created provider_contact table');

    // Create platform_feature table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS platform_feature (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        feature_group VARCHAR(100),
        active BOOLEAN DEFAULT true,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✓ Created platform_feature table');

    // Create feature_provider relationship table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS feature_provider (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        feature_id UUID REFERENCES platform_feature(id),
        provider_id UUID REFERENCES provider(id),
        supported BOOLEAN NOT NULL,
        notes TEXT,
        created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(feature_id, provider_id)
      )
    `);
    console.log('✓ Created feature_provider table');

    // Create indexes for performance
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_provider_contact_provider_id ON provider_contact(provider_id);
      CREATE INDEX IF NOT EXISTS idx_feature_provider_feature_id ON feature_provider(feature_id);
      CREATE INDEX IF NOT EXISTS idx_feature_provider_provider_id ON feature_provider(provider_id);
      CREATE INDEX IF NOT EXISTS idx_platform_feature_category ON platform_feature(category);
    `);
    console.log('✓ Created database indexes');

    console.log('\n🎉 Database initialization complete!');
    console.log('Next step: Run "npm run seed-db" to populate with demo data');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  } finally {
    await pool.end();
  }
}

initDatabase();