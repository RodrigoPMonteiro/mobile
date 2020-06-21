import axios from 'axios';

 const api = axios.create({
    baseURL: 'http://localhost:3333',
 });

export default api;

/*
    * ios com Emulador: localhost
    * ios com dispositivo físico: IP da máquina 
    * Android com Emulador: adb reverse tcp:3333 tcp:3333 ( localhost )
    * Android com Emulador: ip Específico: 10.0.2.2 ( Android Studio )
    * Android com outro Emulador: 10.0.3.2 ( Genymotion )
    * Android com dispositivo físico: IP da máquina ( ipconfig )
*/