package com.example.yyz.nswbnb_android;

import android.app.Dialog;
import android.content.Context;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.archit.calendardaterangepicker.customviews.DateRangeCalendarView;
import com.example.yyz.nswbnb_android.utils.SelfDialog;

import org.angmarch.views.NiceSpinner;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.LinkedList;
import java.util.List;

import es.dmoral.toasty.Toasty;

public class UserInfoActivity extends AppCompatActivity {
    private EditText user_email,user_name,user_phone;
    private Button user_info_save,user_birth;
    private NiceSpinner user_gender;
    private List<String> gender;
    private Dialog dialog;
    String birthday;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SharedPreferences sharedPreferences = UserInfoActivity.this.getSharedPreferences("USERINFO", Context.MODE_PRIVATE);

        setContentView(R.layout.activity_user_info);
        user_email = findViewById(R.id.user_email);
        user_email.setText(sharedPreferences.getString("useremail","no email"));
        user_email.setEnabled(false);
        user_name = findViewById(R.id.user_name);
        user_name.setText(sharedPreferences.getString("username","no name"));
        user_name.setEnabled(false);
        user_gender = findViewById(R.id.user_gender);
        gender = new LinkedList<>(Arrays.asList("gender","Male", "Female"));
        user_gender.attachDataSource(gender);
        user_birth = findViewById(R.id.user_birth);
        user_phone = findViewById(R.id.user_phone);
        user_info_save = findViewById(R.id.user_info_save);
        initToolBar();
        user_birth.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showdialog();
            }
        });
        user_info_save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                System.out.println(String.valueOf(user_gender.getSelectedIndex()));
                System.out.println(birthday);
                System.out.println(user_phone.getText().toString());
                if(user_gender.getSelectedIndex() == 0 && birthday == null ){
                    Toasty.info(UserInfoActivity.this,"Nothing change",Toasty.LENGTH_SHORT).show();
                }
            }
        });
    }
    private void showdialog() {
        View view=View.inflate(UserInfoActivity.this,R.layout.dialog_layout,null);
        dialog = new SelfDialog(UserInfoActivity.this, 200, 200, view, R.style.dialog);
        dialog.show();
        final Button save = (Button) view.findViewById(R.id.save);
        final DateRangeCalendarView dateView = view.findViewById(R.id.calendar);
        dateView.setCalendarListener(new DateRangeCalendarView.CalendarListener() {
            @Override
            public void onFirstDateSelected(Calendar startDate) {
                SimpleDateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
                birthday = formater.format(startDate.getTime());
            }
            @Override
            public void onDateRangeSelected(Calendar startDate, Calendar endDate) {
            }
        });
        save.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if(birthday != null) {
                    user_birth.setText(birthday);
                }
                dialog.dismiss();
            }
        });
    }
    private void initToolBar() {
        Toolbar toolbar = findViewById(R.id.user_info_toolbar);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }
}
