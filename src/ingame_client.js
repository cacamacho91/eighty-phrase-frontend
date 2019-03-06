const drawClientQuestionInput = () => {
    if (!exists('#questionInput')) {
    const questionInputEl = document.createElement('div')
    questionInputEl.id = 'questionInput'
    questionInputEl.innerHTML = questionInputHTML()
    questionInputEl.querySelector('form').addEventListener('submit', event => {
        event.preventDefault()
        let response = `{
            user_id: ${STATE_user.id},
            round_id: ${STATE_room.current_round.round_id},
            content: ${event.target}.
        }`
        API.createResponse(response)
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