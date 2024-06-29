import Supabase from "./Supabase.js";
class ApiGateway {
    async call(uri, data) {
        const result = await Supabase.client.functions.invoke(`api/${uri}`, {
            body: data,
        });
        if (result.error)
            throw result.error;
        return result.data;
    }
}
export default new ApiGateway();
//# sourceMappingURL=ApiGateway.js.map