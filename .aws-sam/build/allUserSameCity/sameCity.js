const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.sameCityData = async (event, context) => {
    const city=event.queryStringParameters.city
    
    var check=0;
   const params={
    TableName:"userdata",
    ExpressionAttributeValues:{
      ':v1':city
    },
    FilterExpression: "city = :v1",
    
   }
   await DB.scan(params).promise()
   .then((data)=>{
    console.log(data)
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
