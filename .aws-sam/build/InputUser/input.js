const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.Store = async (event, context) => {
    const data=JSON.parse(event.body)
    // console.log(event.body.department)
    // console.log(event.body.city)
    if(data.city==undefined && data.department==undefined)
    {
        response={
            'statusCode':403,
            'body':JSON.stringify({
                message:"Please input proper data department and city are missing"
            })

        }
        return response
    }

    if(data.city!=undefined && data.department==undefined)
    {
        response={
            'statusCode':403,
            'body':JSON.stringify({
                message:"Please input proper data department is missing"
            })

        }
        return response
    }
    if(data.department!=undefined &&data.city==undefined)
    {
        response={
            'statusCode':403,
            'body':JSON.stringify({
                message:"Please input proper data city is missing"
            })

        }
        return response
    }
    
   const params={
    TableName:"userdata123",
    Item:{
        id:data.id,
        Name:data.name,
        department:data.department.toLowerCase(),
        city:data.city.toLowerCase()

    }
   }
   await DB.put(params).promise()
   .then((data)=>{
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            message: 'Data Submitted',
            Data: data
            
        })
    }

   }).catch((err)=>{
    response = {
        'statusCode': 400,
        'body': JSON.stringify({
            message: 'Data not Submitted',
            error:err
            
        })
    }
   })

    return response
};
