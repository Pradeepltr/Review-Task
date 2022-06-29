const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.samedepartmetData = async (event, context) => {
    const dept=event.queryStringParameters.department
    
    var check=0;
   const params={
    TableName:"userdata",
    ExpressionAttributeValues:{
      ':v1':dept
    },
    FilterExpression: "department = :v1",
    
   }
   await DB.scan(params).promise()
   .then((data)=>{
     if(data.Count==0){
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
