package utils;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class handle_date {
	public static String getCurrentFormattedDate() {
        // Create a SimpleDateFormat instance with the desired date format
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
        // Get the current date
        Date currentDate = new Date();
        // Format the current date
        return sdf.format(currentDate);
    }
	public static List<String> current_week_contain_current_date(){
		List<String> list = new ArrayList<String>();
		LocalDate today = LocalDate.now();
		list.add(today.with(DayOfWeek.MONDAY).toString());
		list.add(today.with(DayOfWeek.TUESDAY).toString());
		list.add(today.with(DayOfWeek.WEDNESDAY).toString());
		list.add(today.with(DayOfWeek.THURSDAY).toString());
		list.add(today.with(DayOfWeek.FRIDAY).toString());
		list.add(today.with(DayOfWeek.SATURDAY).toString());
		list.add(today.with(DayOfWeek.SUNDAY).toString());
		return list;
	}
}
