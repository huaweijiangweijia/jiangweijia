xcopy %1 %2 /y/s
net stop TomcatTools
net start TomcatTools
%3mysql-5.1.46-win32\bin\mysql -h127.0.0.1 -uroot -ptldj2010-456-st cut_tools5 < %1\updateDatabase.sql