const drawClientQuestionInput = () => {
    if (!exists('#questionInput')) {
    const questionInputEl = document.createElement('div')
    questionInputEl.id = 'questionInput'
    questionInputEl.innerHTML = questionInputHTML()
    questionInputEl.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        const response = {user_id: STATE_user.id,round_id: STATE_room.current_round.id,
        content: event.target.answer.value}
        API.createResponse(response)
        questionInputEl.innerHTML = questionWaitingHTML()
    })
    drawToElement(rootEl, questionInputEl)}
}

const questionInputHTML = () => `
    <img class = 'avatar'src = "https://api.adorable.io/avatars/30/${STATE_user.name}.png">
        <p>${STATE_room.current_round.question.content}</p>
        <form id='questionInputForm' >
            <input type="text" name="answer" placeholder="type your answer here...">
            <input class="btn-success" type="submit" value="Submit" >
        </form>
    `

const questionWaitingHTML = () => `
    <img class = 'avatar'src = "https://api.adorable.io/avatars/30/${STATE_user.name}.png">
        <p>Waiting for others to respond...</p>`


const getResponses = () => {
    let responses = STATE_room.current_round.responses
    let randArr = [...responses].shuffle()
    return randArr
}

const drawClientVoteInput = () => {
    if (!exists('#questionVoteInput')) {
        const questionVoteInputEl = document.createElement('div')
        questionVoteInputEl.id = 'questionVoteInput'
        questionVoteInputEl.innerHTML = "<h3>VOTE NOW!</h3>"
        const responses = getResponses()
        const filtered = responses.filter(response => {
            return response.user_id !== STATE_user.id
        })
        filtered.forEach(response => {
            const responseEl = document.createElement('div')
            responseEl.innerHTML=`
            <button class='btn btn-outline-success btn-vote'>${response.content}</button>`
            responseEl.querySelector('button').addEventListener('click', () => {
                API.createVote({
                    user_id: STATE_user.id,
                    round_id: STATE_room.current_round.id,
                    response_id: response.id
                })
                questionVoteInputEl.innerHTML = questionWaitingHTML()
            })
            questionVoteInputEl.appendChild(responseEl)
        })
        drawToElement(rootEl, questionVoteInputEl)
    }    
}



