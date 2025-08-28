const { Pool } = require('pg');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'onboard_iq_demo',
  password: process.env.DB_PASSWORD || 'password',
  port: process.env.DB_PORT || 5432,
});

async function seedDatabase() {
  console.log('Seeding OnboardIQ Demo Database...');
  
  try {
    // Clear existing data
    await pool.query('DELETE FROM feature_provider');
    await pool.query('DELETE FROM provider_contact');
    await pool.query('DELETE FROM platform_feature');
    await pool.query('DELETE FROM provider');
    console.log('✓ Cleared existing data');

    // Seed providers (based on actual OnboardIQ lenders)
    const providers = [
      { name: 'Synchrony Financial', vertical: 'Retail Finance', active: true },
      { name: 'Bread Financial', vertical: 'eCommerce', active: true },
      { name: 'Acima Credit', vertical: 'Lease-to-Own', active: true },
      { name: 'Affirm', vertical: 'BNPL', active: true },
      { name: 'Klarna', vertical: 'BNPL', active: true },
      { name: 'Wells Fargo', vertical: 'Banking', active: true },
      { name: 'TD Bank', vertical: 'Banking', active: true },
      { name: 'Fortiva Financial', vertical: 'Subprime', active: true },
      { name: 'Concora Credit', vertical: 'Alternative', active: true },
      { name: 'Upgrade', vertical: 'Personal Loans', active: true }
    ];

    const providerIds = {};
    for (const provider of providers) {
      const id = uuidv4();
      await pool.query(
        'INSERT INTO provider (id, name, vertical, active) VALUES ($1, $2, $3, $4)',
        [id, provider.name, provider.vertical, provider.active]
      );
      providerIds[provider.name] = id;
    }
    console.log(`✓ Seeded ${providers.length} providers`);

    // Seed platform features (from your actual OnboardIQ feature matrix)
    const features = [
      // Application Features
      { name: 'Native Application', description: 'Direct application processing within merchant system', category: 'Application', feature_group: 'Core Application' },
      { name: 'Prequalification', description: 'Soft credit check for initial qualification', category: 'Application', feature_group: 'Pre-Assessment' },
      { name: 'Prescreen', description: 'Quick eligibility screening without full application', category: 'Application', feature_group: 'Pre-Assessment' },
      { name: 'Soft Pull Full Application (HI)', description: 'Complete application with soft credit inquiry', category: 'Application', feature_group: 'Core Application' },
      { name: 'Full Application', description: 'Complete credit application with hard inquiry', category: 'Application', feature_group: 'Core Application' },
      { name: 'Joint Application', description: 'Application for multiple applicants', category: 'Application', feature_group: 'Advanced Application' },
      { name: 'Separate Individual Application', description: 'Individual applications processed separately', category: 'Application', feature_group: 'Advanced Application' },
      { name: 'Direct to Tertiary', description: 'Direct routing to third-party lenders', category: 'Application', feature_group: 'Routing' },
      { name: 'Resume', description: 'Resume incomplete applications', category: 'Application', feature_group: 'Workflow' },
      { name: 'Top-Off', description: 'Additional funding for existing customers', category: 'Application', feature_group: 'Customer Management' },
      { name: 'Offer Acceptance', description: 'Accept and process credit offers', category: 'Application', feature_group: 'Decisioning' },
      { name: 'Lease/Loan Agreement', description: 'Generate and process loan agreements', category: 'Application', feature_group: 'Documentation' },
      { name: 'WebHooks', description: 'Real-time event notifications', category: 'Application', feature_group: 'Integration' },

      // Payment Features
      { name: 'Credit Authorization', description: 'Authorize credit transactions', category: 'Payment Features', feature_group: 'Transaction Processing' },
      { name: 'Cancellation', description: 'Cancel transactions and authorizations', category: 'Payment Features', feature_group: 'Transaction Management' },
      { name: 'Refunds', description: 'Process customer refunds', category: 'Payment Features', feature_group: 'Transaction Management' },
      { name: 'Loan Adjustments', description: 'Adjust loan terms and amounts', category: 'Payment Features', feature_group: 'Account Management' },
      { name: 'Funding', description: 'Disburse approved loan funds', category: 'Payment Features', feature_group: 'Disbursement' },
      { name: 'Partial Funding', description: 'Partial fund disbursement', category: 'Payment Features', feature_group: 'Disbursement' },
      { name: 'Settlement Reporting', description: 'Transaction settlement and reporting', category: 'Payment Features', feature_group: 'Reporting' },

      // eCommerce Features
      { name: 'eCommerce Native Application', description: 'Native application for online checkout', category: 'eCommerce Features', feature_group: 'eCommerce Core' },
      { name: 'eCommerce Prequalification', description: 'Online prequalification flow', category: 'eCommerce Features', feature_group: 'eCommerce Pre-Assessment' },
      { name: 'eCommerce Prescreen', description: 'Quick online eligibility check', category: 'eCommerce Features', feature_group: 'eCommerce Pre-Assessment' },
      { name: 'eCommerce Full Application', description: 'Complete online credit application', category: 'eCommerce Features', feature_group: 'eCommerce Core' },
      { name: 'eCommerce Joint Application', description: 'Online joint application support', category: 'eCommerce Features', feature_group: 'eCommerce Advanced' },
      { name: 'eCommerce Resume', description: 'Resume online applications', category: 'eCommerce Features', feature_group: 'eCommerce Workflow' },
      { name: 'eCommerce Top-Off', description: 'Online additional funding', category: 'eCommerce Features', feature_group: 'eCommerce Customer Management' },
      { name: 'eCommerce Offer Acceptance', description: 'Online offer acceptance', category: 'eCommerce Features', feature_group: 'eCommerce Decisioning' },
      { name: 'eCommerce WebHooks', description: 'eCommerce event notifications', category: 'eCommerce Features', feature_group: 'eCommerce Integration' },

      // Miscellaneous Features
      { name: 'Credit Limit Increase', description: 'Increase existing credit limits', category: 'Miscellaneous', feature_group: 'Account Management' },
      { name: 'Stipulations', description: 'Handle conditional approvals', category: 'Miscellaneous', feature_group: 'Compliance' },
      { name: 'Plan/Financing Data', description: 'Financing plan configuration', category: 'Miscellaneous', feature_group: 'Configuration' },
      { name: 'Training/Certification Tracking', description: 'Track merchant training and certification', category: 'Miscellaneous', feature_group: 'Merchant Management' }
    ];

    const featureIds = {};
    for (const feature of features) {
      const id = uuidv4();
      await pool.query(
        'INSERT INTO platform_feature (id, name, description, category, feature_group, active) VALUES ($1, $2, $3, $4, $5, $6)',
        [id, feature.name, feature.description, feature.category, feature.feature_group, true]
      );
      featureIds[feature.name] = id;
    }
    console.log(`✓ Seeded ${features.length} platform features`);

    // Seed feature-provider relationships (realistic support matrix)
    const relationships = [
      // Synchrony Financial - Strong retail finance capabilities
      { provider: 'Synchrony Financial', feature: 'Native Application', supported: true },
      { provider: 'Synchrony Financial', feature: 'Prequalification', supported: true },
      { provider: 'Synchrony Financial', feature: 'Full Application', supported: true },
      { provider: 'Synchrony Financial', feature: 'Joint Application', supported: true },
      { provider: 'Synchrony Financial', feature: 'Credit Authorization', supported: true },
      { provider: 'Synchrony Financial', feature: 'Refunds', supported: true },
      { provider: 'Synchrony Financial', feature: 'Funding', supported: true },
      { provider: 'Synchrony Financial', feature: 'Credit Limit Increase', supported: true },

      // Bread Financial - eCommerce focused
      { provider: 'Bread Financial', feature: 'eCommerce Native Application', supported: true },
      { provider: 'Bread Financial', feature: 'eCommerce Prequalification', supported: true },
      { provider: 'Bread Financial', feature: 'eCommerce Full Application', supported: true },
      { provider: 'Bread Financial', feature: 'eCommerce WebHooks', supported: true },
      { provider: 'Bread Financial', feature: 'WebHooks', supported: true },
      { provider: 'Bread Financial', feature: 'Credit Authorization', supported: true },
      { provider: 'Bread Financial', feature: 'Settlement Reporting', supported: true },

      // Acima Credit - Lease-to-own specialist
      { provider: 'Acima Credit', feature: 'Native Application', supported: true },
      { provider: 'Acima Credit', feature: 'Prescreen', supported: true },
      { provider: 'Acima Credit', feature: 'Lease/Loan Agreement', supported: true },
      { provider: 'Acima Credit', feature: 'Credit Authorization', supported: true },
      { provider: 'Acima Credit', feature: 'Funding', supported: true },
      { provider: 'Acima Credit', feature: 'Partial Funding', supported: true },

      // Affirm - BNPL leader
      { provider: 'Affirm', feature: 'eCommerce Native Application', supported: true },
      { provider: 'Affirm', feature: 'eCommerce Prequalification', supported: true },
      { provider: 'Affirm', feature: 'eCommerce Offer Acceptance', supported: true },
      { provider: 'Affirm', feature: 'Credit Authorization', supported: true },
      { provider: 'Affirm', feature: 'Refunds', supported: true },
      { provider: 'Affirm', feature: 'WebHooks', supported: true },

      // Klarna - BNPL with strong eCommerce
      { provider: 'Klarna', feature: 'eCommerce Native Application', supported: true },
      { provider: 'Klarna', feature: 'eCommerce Prescreen', supported: true },
      { provider: 'Klarna', feature: 'eCommerce Offer Acceptance', supported: true },
      { provider: 'Klarna', feature: 'Credit Authorization', supported: true },
      { provider: 'Klarna', feature: 'Cancellation', supported: true },
      { provider: 'Klarna', feature: 'Refunds', supported: true },

      // Add some unsupported features for realistic matrix
      { provider: 'Synchrony Financial', feature: 'eCommerce WebHooks', supported: false },
      { provider: 'Bread Financial', feature: 'Joint Application', supported: false },
      { provider: 'Acima Credit', feature: 'eCommerce Native Application', supported: false },
      { provider: 'Affirm', feature: 'Joint Application', supported: false },
      { provider: 'Klarna', feature: 'Lease/Loan Agreement', supported: false }
    ];

    for (const rel of relationships) {
      if (providerIds[rel.provider] && featureIds[rel.feature]) {
        await pool.query(
          'INSERT INTO feature_provider (feature_id, provider_id, supported) VALUES ($1, $2, $3)',
          [featureIds[rel.feature], providerIds[rel.provider], rel.supported]
        );
      }
    }
    console.log(`✓ Seeded ${relationships.length} feature-provider relationships`);

    // Seed provider contacts
    const contacts = [
      { name: 'Amanda Thompson', email: 'amanda.thompson@onboard.demo', provider: 'Synchrony Financial', roles: 'Integration Specialist,Technical Lead', verticals: 'Retail Finance,In-Store' },
      { name: 'Mike Rodriguez', email: 'mike.rodriguez@onboard.demo', provider: 'Bread Financial', roles: 'API Integration,eCommerce Specialist', verticals: 'eCommerce,Online Checkout' },
      { name: 'Sarah Chen', email: 'sarah.chen@onboard.demo', provider: 'Acima Credit', roles: 'Account Manager,Implementation', verticals: 'Lease-to-Own,Furniture' },
      { name: 'Lisa Simmers', email: 'lisa.simmers@onboard.demo', provider: 'Wells Fargo', roles: 'Senior Integration Manager,Domain Expert', verticals: 'Banking,Commercial' },
      { name: 'Chris Herndon', email: 'chris.herndon@onboard.demo', provider: 'Affirm', roles: 'Sales Engineer,Technical Account Manager', verticals: 'BNPL,eCommerce' },
      { name: 'Maxwell Rieck', email: 'maxwell.rieck@onboard.demo', provider: 'TD Bank', roles: 'Business Development,Partnership Manager', verticals: 'Banking,Automotive' },
      { name: 'Jennifer Walsh', email: 'jennifer.walsh@onboard.demo', provider: 'Klarna', roles: 'Integration Support,Customer Success', verticals: 'BNPL,Retail' },
      { name: 'David Kim', email: 'david.kim@onboard.demo', provider: 'Fortiva Financial', roles: 'Technical Lead,API Specialist', verticals: 'Subprime,Alternative' },
      { name: 'Melissa Johnson', email: 'melissa.johnson@onboard.demo', provider: 'Concora Credit', roles: 'Operations Manager,Implementation', verticals: 'Alternative Finance,Small Business' },
      { name: 'Eric Brittingham', email: 'eric.brittingham@onboard.demo', provider: 'Upgrade', roles: 'Partnership Manager,Business Development', verticals: 'Personal Loans,Digital Banking' }
    ];

    for (const contact of contacts) {
      await pool.query(
        'INSERT INTO provider_contact (provider_id, name, email, roles, platform_vertical_market_ids, active) VALUES ($1, $2, $3, $4, $5, $6)',
        [providerIds[contact.provider], contact.name, contact.email, contact.roles, contact.verticals, true]
      );
    }
    console.log(`✓ Seeded ${contacts.length} provider contacts`);

    console.log('\n🎉 Database seeding complete!');
    console.log('Demo data includes:');
    console.log(`  - ${providers.length} lending providers`);
    console.log(`  - ${features.length} platform features across 4 categories`);
    console.log(`  - ${relationships.length} feature-provider relationships`);
    console.log(`  - ${contacts.length} provider contacts`);
    console.log('\nReady to start demo server: npm start');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
  } finally {
    await pool.end();
  }
}

seedDatabase();