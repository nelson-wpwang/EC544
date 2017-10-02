import json
import time
import serial
import queue
import requests
###
q = queue.Queue()
###
ser = serial.Serial(
                        port = '/dev/tty.usbserial-AE01CSTF',
                        #port = '/dev/ttyUSB0',
                        baudrate = 9600,
                        parity = serial.PARITY_NONE,
                        stopbits = serial.STOPBITS_ONE,
                        bytesize = serial.EIGHTBITS,
                        timeout = 0.5
                    )
###

URL= 'http://api.rewindkit.com'
flag = 0

while True:
    #print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    l = list()
    x = ser.readlines()
    if x == '':
        continue
    for items in x:
        l.append(items)
    #    print(items)
    #    print(x)

    for item in l:
        id_num, temperature = item.decode("ascii").split("-")
        temperature = temperature.strip('\n')
        lst = [id_num, temperature]
    #    print(lst)
        q.put(lst)

    while q.empty() != True and flag == 0:
        if flag == 1:
            print("last data transfer was not successful, try the http request again")
            p = requests.post(url = URL, data = dt)
            if p.status_code == requests.codes.ok:
                flag = 0
                continue
        else:
    #        print("last data transfer was successful")
            lst1 = q.get()
            dt = {
                'id' : lst1[0],
                'temperature' : lst1[1],
                'timestamp' : time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())
                }
            headers = {'content-type' : 'application/json'}
            p = requests.post(url = URL, data = json.dumps(dt), headers = headers)
            if not p.status_code == requests.codes.ok:
                flag = 1
    #    print("flag = ",flag)
    #print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
    time.sleep(.05)
