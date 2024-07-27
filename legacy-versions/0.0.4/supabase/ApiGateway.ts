import Supabase from "./Supabase.js";

class ApiGateway {
  public async call(uri: string, data: any) {
    const result = await Supabase.client.functions.invoke(`api/${uri}`, {
      body: data,
    });
    if (result.error) throw result.error;
    return result.data;
  }
}

export default new ApiGateway();
