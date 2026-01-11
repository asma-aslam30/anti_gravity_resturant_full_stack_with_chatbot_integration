/**
 * Quick Test Script for NeoBite Restaurant API
 * Tests backend endpoints to verify functionality
 */

// Using native fetch (Node.js 18+)

const API_URL = 'http://localhost:3001';

// Color codes for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Test: Health Check
 */
async function testHealthCheck() {
  try {
    log('\n🔍 Testing Health Check Endpoint...', 'blue');
    const response = await fetch(`${API_URL}/api/health`);
    const data = await response.json();
    
    if (response.ok && data.status === 'ok') {
      log('✅ Health Check: PASSED', 'green');
      log(`   Message: ${data.message}`);
      return true;
    } else {
      log('❌ Health Check: FAILED', 'red');
      return false;
    }
  } catch (error) {
    log(`❌ Health Check: ERROR - ${error.message}`, 'red');
    return false;
  }
}

/**
 * Test: Send Order Email
 */
async function testOrderEmail() {
  try {
    log('\n📧 Testing Order Email Endpoint...', 'blue');
    
    const orderData = {
      orderData: {
        email: 'test@example.com',
        name: 'Test Customer',
        orderNumber: `TEST-${Date.now()}`,
        phone: '+1234567890',
        address: '123 Test Street, Test City',
        items: [
          { name: 'Classic Burger', quantity: 2, price: 12.99 },
          { name: 'French Fries', quantity: 1, price: 4.99 }
        ],
        total: 30.97
      }
    };

    const response = await fetch(`${API_URL}/api/send-order-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log('✅ Order Email: PASSED', 'green');
      log(`   Message: ${data.message}`);
      if (data.messageId) {
        log(`   Message ID: ${data.messageId}`);
      }
      return true;
    } else {
      log('❌ Order Email: FAILED', 'red');
      log(`   Error: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    log(`❌ Order Email: ERROR - ${error.message}`, 'red');
    return false;
  }
}

/**
 * Test: Send Booking Email
 */
async function testBookingEmail() {
  try {
    log('\n📅 Testing Booking Email Endpoint...', 'blue');
    
    const bookingData = {
      bookingData: {
        email: 'test@example.com',
        name: 'Test Customer',
        phone: '+1234567890',
        date: '2026-01-20',
        time: '19:00',
        guests: '4',
        specialRequests: 'Window seat preferred'
      }
    };

    const response = await fetch(`${API_URL}/api/send-booking-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData)
    });

    const data = await response.json();

    if (response.ok && data.success) {
      log('✅ Booking Email: PASSED', 'green');
      log(`   Message: ${data.message}`);
      if (data.messageId) {
        log(`   Message ID: ${data.messageId}`);
      }
      return true;
    } else {
      log('❌ Booking Email: FAILED', 'red');
      log(`   Error: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    log(`❌ Booking Email: ERROR - ${error.message}`, 'red');
    return false;
  }
}

/**
 * Run All Tests
 */
async function runTests() {
  log('═══════════════════════════════════════════════', 'yellow');
  log('   NeoBite Restaurant API Test Suite', 'yellow');
  log('═══════════════════════════════════════════════', 'yellow');

  const results = {
    healthCheck: await testHealthCheck(),
    orderEmail: await testOrderEmail(),
    bookingEmail: await testBookingEmail(),
  };

  // Summary
  log('\n═══════════════════════════════════════════════', 'yellow');
  log('   Test Summary', 'yellow');
  log('═══════════════════════════════════════════════', 'yellow');

  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(r => r === true).length;
  const failed = total - passed;

  log(`\nTotal Tests: ${total}`);
  log(`Passed: ${passed}`, passed === total ? 'green' : 'yellow');
  log(`Failed: ${failed}`, failed === 0 ? 'green' : 'red');

  if (passed === total) {
    log('\n🎉 All tests passed!', 'green');
  } else {
    log('\n⚠️  Some tests failed. Check the output above for details.', 'yellow');
  }

  log('\n═══════════════════════════════════════════════\n', 'yellow');
  
  // Exit with appropriate code
  process.exit(failed === 0 ? 0 : 1);
}

// Run tests
runTests().catch(error => {
  log(`\n❌ Test suite error: ${error.message}`, 'red');
  process.exit(1);
});
