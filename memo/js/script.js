$(document).ready(function() {
    const maxEmotions = 10;
    let emotions = JSON.parse(localStorage.getItem('emotions')) || [];
    let savedSexLifeType = localStorage.getItem('sexLifeType') || '';

    // 性生活タイプが保存されている場合、選択肢を表示する
    if (savedSexLifeType) {
        $('#sex-life-type').val(savedSexLifeType);
    }

    $('#save-type-button').on('click', function() {
        const selectedType = $('#sex-life-type').val();
        if (selectedType) {
            savedSexLifeType = selectedType;
            localStorage.setItem('sexLifeType', savedSexLifeType);
            alert('性生活タイプが保存されました。');
        } else {
            alert('性生活タイプを選択してください。');
        }
    });

    $('.emotion-button').on('click', function() {
        const emotionType = $(this).attr('data-emotion');
        const sexLifeType = savedSexLifeType;

        console.log('選択された感情:', emotionType);
        console.log('選択された性生活タイプ:', sexLifeType);

        if (!sexLifeType) {
            alert('まず、性生活タイプを選択し、保存してください。');
            return;
        }

        const date = new Date().toLocaleString();
        let advice = '';

        switch (sexLifeType) {
            case 'UMA':
                advice = getAdviceForType1(emotionType);
                break;
            case 'ペンギン':
                advice = getAdviceForType2(emotionType);
                break;
            case 'モモンガ':
                advice = getAdviceForType2(emotionType);
                break;
            case 'にゃんこ':
                advice = getAdviceForType2(emotionType);
                break;
            case 'カメレオン':
                advice = getAdviceForType2(emotionType);
                break;
            default:
                advice = '感情を選択してください。';
        }

        console.log('表示されるアドバイス:', advice);

        $('#advice-text').text(advice);
        $('#advice-container').show();

        saveEmotion({ type: `${sexLifeType} - ${emotionType}`, advice: advice, date: date });
    });

    function saveEmotion(emotion) {
        if (emotions.length >= maxEmotions) {
            alert('感情は最大10件まで保存できます。');
            return;
        }
        emotions.push(emotion);
        localStorage.setItem('emotions', JSON.stringify(emotions));
        displayEmotions();
    }

    function displayEmotions() {
        $('#emotion-list').empty();
        emotions.forEach((emotion, index) => {
            $('#emotion-list').append(`
                <li>
                    ${emotion.date} - ${emotion.type} - ${emotion.advice}
                    <button class="edit-button" onclick="editEmotion(${index})">編集</button>
                    <button class="delete-button" onclick="deleteEmotion(${index})">削除</button>
                </li>
            `);
        });
    }

    function getAdviceForType1(emotionType) {
        switch (emotionType) {
            case 'かなしい':
                return 'UMA - 今日は相手の気持ちを大切にし、思いやりを持って接しましょう。';
            case 'ふつう':
                return 'UMA - リラックスした時間を共有することを意識してみましょう。';
            case 'うれしい':
                return 'UMA - 楽しい時間を一緒に過ごすことで、さらに関係が深まるでしょう。';
            default:
                return '感情を選択してください。';
        }
    }

    function getAdviceForType2(emotionType) {
        switch (emotionType) {
            case 'かなしい':
                return 'ペンギン - 今日は少し距離を置いて、自分の時間を大切にしましょう。';
            case 'ふつう':
                return 'ペンギン - いつもと違うことを試して、日常に変化を加えてみましょう。';
            case 'うれしい':
                return 'ペンギン - 前向きな気持ちをシェアして、一緒に楽しい計画を立てましょう。';
            default:
                return '感情を選択してください。';
        }
    }

    window.editEmotion = function(index) {
        const newEmotion = prompt('新しい感情を入力してください:', emotions[index].type.split(' - ')[1]);
        if (newEmotion) {
            const sexLifeType = emotions[index].type.split(' - ')[0];
            let advice = '';

            switch (sexLifeType) {
                case 'UMA':
                    advice = getAdviceForType1(newEmotion);
                    break;
                case 'ペンギン':
                    advice = getAdviceForType2(newEmotion);
                    break;
                case 'モモンガ':
                    advice = getAdviceForType2(newEmotion);
                    break;
                case 'にゃんこ':
                    advice = getAdviceForType2(newEmotion);
                    break;
                case 'カメレオン':
                    advice = getAdviceForType2(newEmotion);
                    break;
                default:
                    advice = '感情を選択してください。';
            }

            emotions[index] = { type: `${sexLifeType} - ${newEmotion}`, advice: advice, date: emotions[index].date };
            localStorage.setItem('emotions', JSON.stringify(emotions));
            displayEmotions();
        }
    };

    window.deleteEmotion = function(index) {
        emotions.splice(index, 1);
        localStorage.setItem('emotions', JSON.stringify(emotions));
        displayEmotions();
    };

    displayEmotions();
});
