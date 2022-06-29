const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.singleUserData = async (event, context) => {
    const id=event.pathParameters.userId
    
    var check=0;
   const params={
    TableName:"userdata",
    ExpressionAttributeValues:{
      ':v1':id
    },
    KeyConditionExpression: "id = :v1",
    
   }
   await DB.query(params).promise()
   .then((data)=>{
    if(data.Count==0)
    {
        check=1;
    }
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'Data found',
            Data: data.Items
            
        })
    }

   }).catch((err)=>{
    response = {
        'statusCode': 400,
        'body': JSON.stringify({
            message: 'Data not found',
            error:err
            
        })
    }
   })
   if(check==1)
   {
    response = {
        'statusCode': 400,
        'body': JSON.stringify({
            message: 'Data not found',
            
            
        })
    }

   }

    return response
};
