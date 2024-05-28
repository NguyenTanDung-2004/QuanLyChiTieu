package utils;

import com.google.gson.Gson;

public class convert_JavaObject_to_Json {
	public static String convertObjectToJson(Object obj) {
        Gson gson = new Gson();
        return gson.toJson(obj);
    }
}
