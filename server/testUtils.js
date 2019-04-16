const login = (agent, info) => {
    return new Promise((resolve, reject) => {
        agent.post('/auth/login')
            .send({
                email: info.email,
                password: info.password
            }).end((err, res) => {
                if (err) return reject(err)
                if (!res.body.id) return reject(new Error('NOT FOUND'))
                resolve()
            })
    })
}
const signup = (agent, info) => {
    return new Promise((resolve, reject) => {
        agent.post('/auth/signup')
            .send(info)
            .end((err, res) => {
                if (err) return reject(err)
                resolve(res.body)
            })
    })
}
module.exports = { login, signup }