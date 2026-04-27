// simple keyword matcher — not fancy, but works for a restaurant bot
// if this ever needs to scale, swap the matcher with an actual NLP lib or OpenAI call

const responses = [
  {
    patterns: ['hour', 'open', 'close', 'timing', 'time', 'when'],
    reply: "We're open Mon–Sat from 11:00 AM to 10:00 PM, and Sundays 12:00 PM to 9:00 PM. Last orders are taken 30 mins before closing.",
  },
  {
    patterns: ['menu', 'food', 'dish', 'eat', 'starter', 'main', 'dessert', 'drink'],
    reply: "Our menu has Starters, Mains, Desserts, and Drinks. Some favourites are the Herb-Crusted Lamb Rack, Pan-Seared Salmon, and Crème Brûlée. Head to the Menu page to see everything with prices!",
  },
  {
    patterns: ['book', 'reserve', 'reservation', 'table', 'seat'],
    reply: "You can book a table on our Book a Table page. Fill in your name, email, phone, date, and time — takes less than a minute. We confirm within 2 hours.",
  },
  {
    patterns: ['location', 'address', 'where', 'find', 'map', 'thamel'],
    reply: "We're located in Thamel, Kathmandu. Easy to find — just off the main Thamel chowk. You can also call us at +977 01-4123456 for directions.",
  },
  {
    patterns: ['price', 'cost', 'expensive', 'cheap', 'budget', 'nrs', 'npr'],
    reply: "Our starters start from NPR 350, mains range from NPR 980 to NPR 2100, and desserts from NPR 450. Drinks start at NPR 280. Full prices are on the Menu page.",
  },
  {
    patterns: ['phone', 'call', 'contact', 'email', 'reach'],
    reply: "You can reach us at +977 01-4123456 or email us at hello@lamaison.np. We're usually pretty quick to respond.",
  },
  {
    patterns: ['cancel', 'cancellation'],
    reply: "To cancel or change a booking, please call us at +977 01-4123456 at least 2 hours before your reservation time.",
  },
  {
    patterns: ['parking', 'park'],
    reply: "There's street parking nearby and a few paid lots within walking distance in Thamel. We'd recommend arriving by taxi or ride-share if possible.",
  },
  {
    patterns: ['vegetarian', 'vegan', 'allergy', 'gluten', 'dietary'],
    reply: "We have vegetarian options and can accommodate most dietary requirements. Just mention it in the Special Requests field when booking, or tell your server when you arrive.",
  },
  {
    patterns: ['hello', 'hi', 'hey', 'hola', 'namaste'],
    reply: "Hey there! How can I help you today? You can ask me about our menu, opening hours, reservations, or location.",
  },
  {
    patterns: ['thank', 'thanks', 'cheers', 'great', 'helpful'],
    reply: "Happy to help! Anything else you'd like to know?",
  },
  {
    patterns: ['birthday', 'anniversary', 'celebration', 'occasion', 'special'],
    reply: "We love celebrating special occasions! Add it in the booking form under 'Special Occasion' and our team will make it memorable. We can also arrange a cake — just ask.",
  },
]

// the actual matching logic — nothing clever, just loops
function findReply(message) {
  const lower = message.toLowerCase()

  for (let i = 0; i < responses.length; i++) {
    const r = responses[i]
    for (let j = 0; j < r.patterns.length; j++) {
      if (lower.includes(r.patterns[j])) {
        return r.reply
      }
    }
  }

  return null
}

exports.chat = (req, res) => {
  const { message } = req.body

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' })
  }

  if (message.length > 500) {
    return res.status(400).json({ error: 'message too long' })
  }

  const reply = findReply(message.trim())

  if (reply) {
    return res.json({ reply })
  }

  // fallback — covers anything we didn't pattern match
  // TODO: this works but would be way better with an actual AI fallback, not enough time rn
  res.json({
    reply: "I'm not sure about that one. You can call us at +977 01-4123456 or email hello@lamaison.np for anything specific!",
  })
}
