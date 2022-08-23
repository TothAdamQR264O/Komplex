package Program;

import java.awt.EventQueue;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JButton;
import javax.swing.JLabel;
import java.awt.event.ActionListener;
import java.awt.event.ActionEvent;
import javax.swing.SwingConstants;

public class Megerosito extends JDialog {
	
	public boolean erosit = false;
	
	public Megerosito(JFrame f, String s) {
		super(f, "Súlyozott átlag megerõsítés", true);
		setBounds(100, 100, 341, 206);
		getContentPane().setLayout(null);
		
		JButton btnIegen = new JButton("Igen");
		btnIegen.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				erosit = true;
				dispose();
			}
		});
		btnIegen.setBounds(10, 133, 89, 23);
		getContentPane().add(btnIegen);
		
		JButton btnNem = new JButton("Nem");
		btnNem.addActionListener(new ActionListener() {
			public void actionPerformed(ActionEvent e) {
				erosit = false;
				dispose();
			}
		});
		btnNem.setBounds(226, 133, 89, 23);
		getContentPane().add(btnNem);
		
		JLabel Szoveg = new JLabel(s);
		Szoveg.setHorizontalAlignment(SwingConstants.CENTER);
		Szoveg.setBounds(25, 50, 278, 14);
		getContentPane().add(Szoveg);
		
		
	}
}
