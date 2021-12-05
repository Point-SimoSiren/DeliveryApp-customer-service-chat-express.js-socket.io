const users = []

const addUser = ({ id, username, topic }) => {
    username = username.trim().toLowerCase()
    topic = topic.trim().toLowerCase()

    // join formin Validointi
    if (!username || !topic) {
        return {
            error: 'Name required'
        }
    }

    // Check for existing session with the same user
    const existingSession = users.find((user) => {
        return user.topic === topic && user.username === username
    })

    // Check for another customer in service topic chat at the same time


    
    const previousCustomer = (username) => {
        let billing = 0
        let delivery = 0
        let customerhip = 0
        let products = 0
    
        users.map((prev) => {
            switch (prev.topic) {
                case 'billing':
                    billing++
                    break
                case 'delivery':
                    delivery++
                    break
                case 'customership':
                    customerhip++
                    break
                case 'products':
                    products++
                    break
            }
        })
       if (topic === 'billing' && billing > 1) {
       return true
       }
       if (topic === 'delivery' && delivery > 1) {
       return true
       }
       if (topic === 'products' && products > 1) {
       return true
       }
       if (topic === 'customership' && customerhip > 1) {
       return true
       }
       else {
           return false
       }

        }
    
    // Prevent multiple people in one topic at a time
    if (previousCustomer(username)) {
        return {
            error: 'Previous customer is still in the chat session. Try again soon.'
        }
    }


    // Validate username
    if (existingSession) {
        return {
            error: 'Name is already in use on another open chat session'
        }
    }

    // Store user
    const user = { id, username, topic }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)

    if (index !== -1) {
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersByTopic = (topic) => {
    topic = topic.trim().toLowerCase()
    return users.filter((user) => user.topic === topic)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersByTopic
}