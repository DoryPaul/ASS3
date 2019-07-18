package com.example.yyz.nswbnb_android;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class UpdatePasswordActivity extends AppCompatActivity {
    private EditText user_old_password,user_new_password,user_confirm_password;
    private Button user_password_update;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_update_password);
        user_old_password = findViewById(R.id.user_old_password);
        user_new_password = findViewById(R.id.user_new_password);
        user_confirm_password = findViewById(R.id.user_confirm_password);
        user_password_update = findViewById(R.id.user_password_update);
        initToolBar();
    }
    private void initToolBar() {
        Toolbar toolbar = findViewById(R.id.update_password_toolbar);
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
            }
        });
    }

}
