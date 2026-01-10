require('dotenv').config()
const OpenAI = require('openai')

console.log('Testing OpenAI API Key...')
console.log('Key length:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 'MISSING')
console.log('Key starts with:', process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.substring(0, 20) : 'MISSING')

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ No API key found!')
  process.exit(1)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY.trim()
})

async function test() {
  try {
    console.log('\n🔍 Testing API key...')
    const response = await openai.models.list()
    console.log('✅ API Key is VALID!')
    console.log('Available models:', response.data.length)
    process.exit(0)
  } catch (error) {
    console.error('❌ API Key Error:', error.message)
    if (error.message.includes('401')) {
      console.error('\n⚠️  The API key is INCORRECT or EXPIRED')
      console.error('Please get a new key from: https://platform.openai.com/account/api-keys')
    }
    process.exit(1)
  }
}

test()
