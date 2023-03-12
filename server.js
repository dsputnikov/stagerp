const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// список ключей, которые могут быть использованы для запуска мода
const keys = ['kO4NqSfhrTcvpItOJSkBgVJQ', 'aV1nsseLxavOBzoEWz8pCyck', 'Y7QQKtZ7v8dCJ1SlFNrhVlLo', '6UeDd6uCW0dJhVwiVn4js2GB', 'MxO4W0gtZdsMFAKj2GMDhlto', 'gPSwA1dCTfSGpMW9pJBtYc0F', 'up6KX20HAiy0r3BKtVY5CviZ', 'bbeIG8TqhCXpXGQXjguyA5oN', 'RL0pjrvezcIPxYqCBR2xLbp7', 'ZTnFI9aTm5TO1jUZKcYO6z8F', 'JmAAwuNcwhV6BKmqckhksdOS', '2FttD0YwzBhtbd81TYLW2ese', 'pBKdpK52fcIiBq3s4YMY6aEe', 'GbbFr6d45lVti4gE0WabV4Ie', 'ynsIKU8dvjPh5QHZTRw57IQw', 'AImT7B03Cc55cWyKVxraPa32', 'SUmvbxnLDFlhJl3gUmo35KBA', 'T2ZdfAXKNhDfb1pTRVkvtvyw', '8cYUnRDyANHK3NnqItQJaWMj', 'LLxEiYZ5CWYoIvFn5QsfS8im'];

// обработчик запроса от клиента
app.post('/checkKey', (req, res) => {
  const { key } = req.body;
  
  // проверяем, есть ли ключ в списке
  if (keys.includes(key)) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false });
  }
});

app.listen(22005, () => {
  console.log('Сервер успешно запущен, порт: 22005');
});
