#!/bin/bash
#
# Test shell script will connect to an FTP server, cd and then put a file
echo '\n\n starting FTP shell'

HOST='lucasmonaco.com'
USER='owurkamu'
PASSWD='mypassword'
NUMFILES=0

########
function usage
{
	echo '\n=======================\n'
	echo 'usage: -f filename -d sourcedir -targ targetdir ' 
	echo '\n==================='
}

function recurser 
{

files=`ls $1`
for file in $files; do
        if [ -d $file ];then
          $NUMFILES=$NUMFILES+1
		echo "$NUMFILES DIR " $1$file
		recurser $file
        else
          $NUMFILES=$NUMFILES+1
		echo " - " $1$file
        fi
done
}


while [ "$1" != "" ]; do
    case $1 in
        -f | --file )           shift
                                filename=$1
                                ;;
        -d | --dir )            shift
				SOURCEDIR=$1
				;;
	-targ | --target )      shift
				TARGETDIR=$1
				;;
	-h | --help )           usage
                                exit
                                ;;
        * )                     usage
                                exit 1
    esac
    shift
done

# Test code to verify command line args processing

if [ "$SOURCEDIR" ]; then
        echo "got SOURCEDIR "$SOURCEDIR
	recurser $SOURCEDIR
	echo "there are "$NUMFILES
else
        echo "sourcedir is blank exiting...."
        usage
	exit
fi

if [ "$TARGETDIR" ]; then
        echo "got targetdir "$HOST $TARGETDIR
else
        echo "targetdir is blank exiting...."
        usage
	exit
fi

#if [ "$filename" ]; then
#	echo "got filename"
#else
#	echo "filename is blank exiting...."
#	usage
#	exit
#fi
exit

echo '===== host is '$HOST
echo '===== filename is '$filename
echo '===== sourcedir is '$SOURCEDIR
echo '===== target dir is '$TARGETDIR

res1=$(date +%s)
sleep 1
echo "===== Start time: $res1"
#

echo "\n OK, starting now..."
sftp "$USER@$HOST" <<EOF
ascii

CD $TARGETDIR

DIR

#put $filename
mput * 

DIR

bye
EOF

#################################################
res2=$(date +%s)
echo "\n Time Elapsed:    $(echo "$res2 - $res1"|bc )"
exit
