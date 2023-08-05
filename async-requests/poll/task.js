const requestURL = 'https://students.netoservices.ru/nestjs-backend/poll';
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

const showSurvey = (obj) => {
  pollTitle.innerText = obj.data.title;
  for (let i = 0; i < obj.data.answers.length; i++) {
    const pollAnswer = document.createElement('button');
    pollAnswer.classList.add('poll__answer');
    pollAnswer.innerText = obj.data.answers[i];
    pollAnswer.addEventListener('click', () => {
      alert('Спасибо, ваш голос засчитан!');
      sendVoteRequest(obj.id, i);
    });
    pollAnswers.append(pollAnswer);
  };
}

const sendVoteRequest = (id, idx) => {
  const xhr = new XMLHttpRequest();
  xhr.open('POST', requestURL);
  xhr.setRequestHeader( 'Content-type', 'application/x-www-form-urlencoded' );
  xhr.onreadystatechange = () => {
    if (xhr.readyState !== xhr.DONE) {
      return;
    }
    const response = JSON.parse(xhr.response);
    showVotingResults(response);
  }
  xhr.send(`vote=${id}&answer=${idx}`);
}

const showVotingResults = (obj) => {
  pollAnswers.classList.remove('poll__answers_active');
  const pollStatItems = document.createElement('div');
  pollStatItems.classList.add('poll__stat-items');
  document.querySelector('.poll').append(pollStatItems);
  obj.stat.forEach(el => {
    const resultElement = document.createElement('div');
    resultElement.classList.add('poll__stat-item');
    pollStatItems.append(resultElement);
    resultElement.innerText = `${el.answer}: ${el.votes}%`
  });
  
}

const getData = () => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', requestURL);
  xhr.onload = () => {
    if (xhr.status !== 200) {
      return;
    }
    const response = JSON.parse(xhr.response);
    showSurvey(response);
  }
  xhr.send();
}

getData();