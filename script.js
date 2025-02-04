const hour = document.querySelector('#hour');
const minute = document.querySelector('#minute');
const AmPm = document.querySelector('#ampm');
const setAlarmBtn = document.querySelector('#setBtn');
const alarmList = document.querySelector('#alarmList');
const ringTone = new Audio('files/morning_flower.mp3');

let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

// Populate dropdowns with time options
for (let i = 12; i > 0; i--) {
    let option = `<option value="${i < 10 ? "0" + i : i}">${i}</option>`;
    hour.innerHTML += option;
}

for (let i = 59; i >= 0; i--) {
    let option = `<option value="${i < 10 ? "0" + i : i}">${i}</option>`;
    minute.innerHTML += option;
}

["AM", "PM"].forEach(ampm => {
    let option = `<option value="${ampm}">${ampm}</option>`;
    AmPm.innerHTML += option;
});

// Function to update the alarm list in UI
const updateAlarmList = () => {
    alarmList.innerHTML = '';
    alarms.forEach((alarm, index) => {
        let li = document.createElement('li');
        li.textContent = alarm;
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteAlarm(index);
        li.appendChild(deleteBtn);
        alarmList.appendChild(li);
    });
};

// Function to delete an alarm
const deleteAlarm = (index) => {
    alarms.splice(index, 1);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    updateAlarmList();
};

// Function to set a new alarm
const setAlarm = () => {
    let time = `${hour.value}:${minute.value} ${AmPm.value}`;
    if (time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")) {
        alert("Please select a valid time");
        return;
    }
    if (!alarms.includes(time)) {
        alarms.push(time);
        localStorage.setItem('alarms', JSON.stringify(alarms));
        updateAlarmList();
    } else {
        alert("This alarm is already set!");
    }
};

// Function to update current time display
const updateCurrentTime = () => {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    
    document.querySelector('#currentTime').textContent = `${h}:${m}:${s} ${ampm}`;
    
    let currentTime = `${h}:${m} ${ampm}`;
    if (alarms.includes(currentTime)) {
        ringTone.play();
    }
};

// Check alarms every second
setInterval(updateCurrentTime, 1000);

// Event listeners
setAlarmBtn.addEventListener('click', setAlarm);
updateAlarmList();
