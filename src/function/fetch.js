const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.fetchdata = async (event, context) => {
    const queryparameter=event.queryStringParameters
   

    var check=0
    if(queryparameter==null)
    {
        const params={
            TableName:"userdata123"
           }
           await DB.scan(params).promise()
           .then((data)=>{
            response = {
                'statusCode': 200,
                'body': JSON.stringify({
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
        
    }
    // const Key=JSON.parse(queryparameter)
    else if(queryparameter.city!=undefined && queryparameter.department!=undefined){
        response={
            'statusCode': 400,
            'body': JSON.stringify({
                message: 'Only one query parameters allowed',
                
                
            })
        }
    }
    
  else if(queryparameter.city!=undefined && queryparameter.department==undefined)
    {
        const city=queryparameter.city
        const params={
            TableName:"userdata123",
            ExpressionAttributeValues:{
              ':v1':city.toLowerCase()
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
    }
   else if(queryparameter.city==undefined && queryparameter.department!=undefined)
    {
        const dept=queryparameter.department
        const params={
            TableName:"userdata123",
            ExpressionAttributeValues:{
              ':v1':dept.toLowerCase()
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
    }
    
    
  
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
